// =================================================================
// VolunteerLog - Vanilla JS Client (Final Exam - B53)
//
// This is the fully working vanilla JS version of the app.
// In this exam you will convert this code to Next.js + React,
// using Server Actions for form handling.
//
// Each function below maps to a React component or page:
//
//   navBarHTML()              ->  <NavBar />
//   activityCardHTML()        ->  <ActivityCard />
//   myActivitiesPage()        ->  app/page.js
//   impactSummaryPage()       ->  app/activities/page.jsx
//   activityFormPage()        ->  app/activities/form/page.jsx
// =================================================================

// ------------------------------------------------------------------
// API helpers
// ------------------------------------------------------------------
async function fetchJSON(url) {
    const res = await fetch(url);
    return await res.json();
}

async function postJSON(url, data) {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.ok;
}

async function deleteResource(resource, id) {
    const res = await fetch(`/api/${resource}/${id}`, { method: "DELETE" });
    return res.ok;
}

// ------------------------------------------------------------------
// URL query-string helpers (used for edit forms)
// ------------------------------------------------------------------
function getQueryParams() {
    return Object.fromEntries(new URLSearchParams(window.location.search));
}

// ==================================================================
// COMPONENTS (each returns an HTML string)
// ==================================================================

// NavBar - shown on every page
function navBarHTML() {
    return `
        <nav class="navbar">
            <a href="/client/index.html" class="brand">VolunteerLog</a>
            <ul class="nav-links">
                <li><a href="/client/index.html">My Activities</a></li>
                <li><a href="/client/pages/activity-form.html">Add Activity</a></li>
            </ul>
        </nav>
    `;
}

// Activity Card - image card used on My Activities page
function activityCardHTML({ activity }) {
    const a = activity;
    const dateLabel = new Date(a.date).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric"
    });

    return `
        <article class="activity-card">
            <div class="cover">
                <img src="${a.image}" alt="${a.title}" />
                <span class="badge badge-${a.status}">${a.status}</span>
            </div>
            <div class="card-body">
                <div class="card-title-row">
                    <h3>${a.title}</h3>
                    <span class="badge badge-${a.category.toLowerCase()}">${a.category}</span>
                </div>
                <p class="card-date">${dateLabel}</p>
                <hr class="card-divider" />
                <div class="card-actions">
                    <a class="action-link"
                       href="pages/activity-detail.html?id=${a.id}">View Details</a>
                    <button class="delete-btn"
                            onclick="handleDeleteActivity(${a.id})" title="Delete ${a.title}">🗑</button>
                </div>
            </div>
        </article>
    `;
}

// Stat Pill - used on Impact Summary
function statPillHTML({ count, label, variant }) {
    return `
        <div class="stat-pill stat-${variant}">
            <span class="stat-count">${count}</span>
            <span class="stat-label">${label}</span>
        </div>
    `;
}

// Category Row - used on Impact Summary
function categoryRowHTML({ name, count, total }) {
    const pct = total > 0 ? (count / total) * 100 : 0;
    return `
        <div class="category-row category-${name.toLowerCase()}">
            <span class="category-name">${name}</span>
            <span class="category-bar">
                <span class="category-fill" style="width: ${pct}%"></span>
            </span>
            <span class="category-count">${count}</span>
        </div>
    `;
}

// ==================================================================
// PAGES (each renders the full page into #root)
// ==================================================================

// -- My Activities page (home - card gallery with category filter + delete) --
let activities = [];
let filterTerm = "";
const ACTIVITY_CATEGORIES = ["Education", "Health", "Environment", "Community"];

async function myActivitiesPage() {
    activities = await fetchJSON("/api/activities");
    renderMyActivitiesPage();
}

function renderMyActivitiesPage() {
    const filtered = filterTerm
        ? activities.filter(a => a.category === filterTerm)
        : activities;

    const optionsHTML = ['<option value="">All categories</option>']
        .concat(ACTIVITY_CATEGORIES.map(cat =>
            `<option value="${cat}" ${filterTerm === cat ? "selected" : ""}>${cat}</option>`
        ))
        .join("");

    document.querySelector("#root").innerHTML = `
        ${navBarHTML()}
        <div class="page-intro">
            <h1>My Activities</h1>
            <p>Track your volunteer work and community impact.</p>
            <div class="filter-select">
                <select onchange="handleFilterChange(event)" aria-label="Filter activities by category">
                    ${optionsHTML}
                </select>
            </div>
        </div>

        <section class="activity-list">
            ${filtered.length === 0
            ? '<p class="empty-state">No activities match - try a different category.</p>'
            : filtered.map(a => activityCardHTML({ activity: a })).join("")}
        </section>
    `;
}

function handleFilterChange(event) {
    filterTerm = event.target.value;
    renderMyActivitiesPage();
}

async function handleDeleteActivity(id) {
    if (!confirm("Delete this activity?")) return;
    if (await deleteResource("activities", id)) {
        activities = activities.filter(a => a.id !== id);
        renderMyActivitiesPage();
    }
}

// -- Activity Detail page (full info for a single activity) --
async function activityDetailPage() {
    const params = getQueryParams();
    const activity = await fetchJSON(`/api/activities/${params.id}`);

    if (!activity || activity.error) {
        document.querySelector("#root").innerHTML = `
            ${navBarHTML()}
            <main class="page">
                <h1>Activity not found</h1>
                <a href="/client/index.html" class="btn btn-primary">Back to My Activities</a>
            </main>
        `;
        return;
    }

    const dateLabel = new Date(activity.date).toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric", year: "numeric"
    });

    document.querySelector("#root").innerHTML = `
        ${navBarHTML()}
        <main class="page detail-page">
            <a href="/client/index.html" class="back-link">&larr; Back to My Activities</a>

            <article class="detail-card">
                <div class="detail-cover">
                    <img src="${activity.image}" alt="${activity.title}">
                </div>

                <div class="detail-body">
                    <div class="detail-badges">
                        <span class="badge badge-${activity.status}">${activity.status}</span>
                        <span class="badge badge-${activity.category.toLowerCase()}">${activity.category}</span>
                    </div>

                    <h1 class="detail-title">${activity.title}</h1>
                    <p class="detail-instructor">Logged with <strong>${activity.organization}</strong></p>

                    <dl class="detail-meta">
                        <div><dt>Hours</dt><dd>${activity.hours}</dd></div>
                        <div><dt>When</dt><dd>${dateLabel}</dd></div>
                        <div><dt>Category</dt><dd>${activity.category}</dd></div>
                    </dl>

                    <h2 class="detail-section-title">About this activity</h2>
                    <p class="detail-description">
                        ${activity.description || "No description provided yet."}
                    </p>
                </div>
            </article>
        </main>
    `;
}

// -- Activity Form page (add/edit) --
function activityFormPage() {
    const params = getQueryParams();
    const isEdit = !!params.id;

    const categories = ["Education", "Health", "Environment", "Community"];
    const statuses = ["planned", "completed"];

    document.querySelector("#root").innerHTML = `
        ${navBarHTML()}
        <main class="page">
            <h1>${isEdit ? "Edit Activity" : "Add Activity"}</h1>
            <div class="form-container">
                <form id="activity-form" onsubmit="handleActivitySubmit(event)">
                    ${isEdit ? `<input type="hidden" name="id" value="${params.id}">` : ""}
                    <div class="form-group">
                        <label for="title">Activity Title</label>
                        <input id="title" name="title" type="text" placeholder="e.g. Math Tutoring"
                            value="${params.title || ""}" required>
                    </div>
                    <div class="form-group">
                        <label for="organization">Organization</label>
                        <input id="organization" name="organization" type="text" placeholder="e.g. Qatar Charity"
                            value="${params.organization || ""}" required>
                    </div>
                    <div class="form-group">
                        <label for="hours">Hours</label>
                        <input id="hours" name="hours" type="number" min="1" placeholder="3"
                            value="${params.hours || ""}" required>
                    </div>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select id="category" name="category">
                            ${categories.map(c => `<option value="${c}" ${params.category === c ? "selected" : ""}>${c}</option>`).join("")}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="status">Status</label>
                        <select id="status" name="status">
                            ${statuses.map(s => `<option value="${s}" ${params.status === s ? "selected" : ""}>${s}</option>`).join("")}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="image">Cover Image URL</label>
                        <input id="image" name="image" type="url" placeholder="https://..."
                            value="${params.image || ""}">
                    </div>
                    <div class="form-group">
                        <label for="date">Activity Date</label>
                        <input id="date" name="date" type="date"
                            value="${params.date || ""}">
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">Save Activity</button>
                        <a href="/client/index.html" class="btn btn-danger">Cancel</a>
                    </div>
                </form>
            </div>
        </main>
    `;
}

async function handleActivitySubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = Object.fromEntries(new FormData(form));
    data.hours = Number(data.hours);
    if (!data.date) data.date = new Date().toISOString().split("T")[0];

    const success = await postJSON("/api/activities", data);

    if (success) {
        window.location.href = "/client/index.html";
    }
}
