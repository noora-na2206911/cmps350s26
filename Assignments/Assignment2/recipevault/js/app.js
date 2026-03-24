
// RecipeVault Client App

// Section 1: Configuration
const API_URL = "https://recipevault-api.vercel.app/api/recipes";


// Section 2: State
let recipes = [];
let editingId = null;


// ============================================
// Section 3: API Helper Functions
async function fetchAllRecipes() {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

async function createRecipe(data) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Error creating recipe:", error);
    }
}

async function updateRecipe(id, data) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating recipe:", error);
    }
}

async function deleteRecipeById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting recipe:", error);
    }
}


// ============================================
// Section 4: Navigation
async function loadPage(page) {
    try {
        const response = await fetch(`pages/${page}.html`);
        const html = await response.text();
        document.querySelector("#main").innerHTML = html;
        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active");
        });

        if (page === "recipes") {
            document.querySelectorAll(".nav-link")[0].classList.add("active");
            loadRecipes();
        }

        if (page === "add-recipe") {
            document.querySelectorAll(".nav-link")[1].classList.add("active");

            document
                .getElementById("recipe-form")
                .addEventListener("submit", handleRecipeSubmit);
        }

    } catch (error) {
        console.error("Error loading page:", error);
    }
}

// ============================================
// Section 5: Display Recipes

function recipeToHTMLCard(recipe) {
    return `
    <div class="recipe-card">
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-card-img">
        <div class="recipe-card-body">
            <h3>${recipe.name}</h3>
            <p>${recipe.description}</p>
            <div class="recipe-meta">
                <span>Prep: ${recipe.prepTime} min</span>
                <span>Cook: ${recipe.cookTime} min</span>
                <span>Serves: ${recipe.servings}</span>
            </div>
            <span class="badge badge-${recipe.difficulty.toLowerCase()}">
                ${recipe.difficulty}
            </span>
        </div>
        <div class="recipe-card-actions">
            <button class="btn btn-primary btn-sm" onclick="startEdit(${recipe.id})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="handleDelete(${recipe.id})">Delete</button>
        </div>
    </div>
    `;
}

function renderRecipes() {
    const grid = document.getElementById("recipes-grid");

    if (!recipes || recipes.length === 0) {
        grid.innerHTML = `<p class="empty-message">No recipes found</p>`;
        return;
    }
    grid.innerHTML = recipes.map(recipe => recipeToHTMLCard(recipe)).join("");
}

async function loadRecipes() {
    try {
        recipes = await fetchAllRecipes();
        renderRecipes();
    } catch (error) {
        console.error("Error loading recipes:", error);
    }
}

// ============================================
// Section 6: Add / Edit Recipe

async function handleRecipeSubmit(e) {
    e.preventDefault();

    try {
        let data = Object.fromEntries(new FormData(e.target));
        data.prepTime = Number(data.prepTime);
        data.cookTime = Number(data.cookTime);
        data.servings = Number(data.servings);

        if (editingId) {
            await updateRecipe(editingId, data);
            cancelEdit();
        } else {
            await createRecipe(data);
        }
        e.target.reset(); loadPage("recipes");
        
    } catch (error) {
        console.error("Error submitting form:", error);
    }
}

function startEdit(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;
    editingId = id;
    loadPage("add-recipe").then(() => {
        document.getElementById("recipe-name").value = recipe.name;
        document.getElementById("recipe-description").value = recipe.description;
        document.getElementById("recipe-image").value = recipe.image;
        document.getElementById("recipe-prepTime").value = recipe.prepTime;
        document.getElementById("recipe-cookTime").value = recipe.cookTime;
        document.getElementById("recipe-servings").value = recipe.servings;
        document.getElementById("recipe-category").value = recipe.category;
        document.getElementById("recipe-cuisine").value = recipe.cuisine;
        document.getElementById("recipe-difficulty").value = recipe.difficulty;
        document.getElementById("recipe-ingredients").value = recipe.ingredients;
        document.getElementById("form-title").textContent = "Edit Recipe";
        document.getElementById("submit-btn").textContent = "Update Recipe";
        document.getElementById("cancel-btn").classList.remove("hidden");
    });
}

function cancelEdit() {
    editingId = null;
    const form = document.getElementById("recipe-form");
    if (form) form.reset();
    document.getElementById("form-title").textContent = "Add New Recipe";
    document.getElementById("submit-btn").textContent = "Add Recipe";
    document.getElementById("cancel-btn").classList.add("hidden");
}

// ============================================
// Section 7: Delete Recipe

async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this recipe?")) return;
    try {
        await deleteRecipeById(id);
        loadRecipes();
    } catch (error) {
        console.error("Error deleting recipe:", error);
    }
}

// ============================================
// Section 8: Initialize
document.addEventListener("DOMContentLoaded", () => {
    loadPage("recipes");
});