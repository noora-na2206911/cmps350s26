# Testing & Grading Sheet: B53 - VolunteerLog

|                  |                                                                                |
| ---------------- | ------------------------------------------------------------------------------ |
| **Student Name** |                                                                                |
| **Student ID**   |                                                                                |
| **Email**        |                                                                                |

**Total: 110 pts**  (TODO 1 = 25, TODO 2 = 10, TODO 3 = 25, TODO 4 = 15, TODO 5 = 35)

---

## Grading Policy

- **Complete and Working** receive 70% of the assigned grade
- **Complete but Not Working** lose 40% of the assigned grade
- **Not Done**  0
- **Code Quality (30%)** meaningful naming, no redundant code, simple and efficient design, proper comments and indentation
- **Missing screenshots −10 pts**

In the **Functionality** column below, write: **Working (completed x%)**, **Not Working (completed x%)**, or **Not Done**.

> **Screenshots:** save your own screenshots into `screenshots/student_screenshots/` using the filenames already referenced below (`todo1-api.png`, `todo2-navbar.png`, `todo3-activities.png`, `todo3-delete.png`, `todo4-detail.png`, `todo5-form.png`).

---

## TODO 1: API Routes (25 pts)

Create the API folder from scratch. Use the repo's `filterByCategory` and `getById` methods.

| Check | Points | Description                                                                                    | Functionality | Grade |
| ----- | ------ | ---------------------------------------------------------------------------------------------- | ------------- | ----- |
| 1a    | 13     | `GET /api/activities` returns all activities as JSON, filtered by `?filter=<category>`          |               |       |
| 1b    | 12     | `GET /api/activities/:id` returns activity or 404                                               |               |       |

**Screenshot:** Postman showing `GET /api/activities`, `GET /api/activities?filter=Education`, and `GET /api/activities/999`

![TODO 1 - API routes](screenshots/student_screenshots/todo1-api.png)

---

## TODO 2: NavBar (10 pts)

| Check    | Points | Description                                                                                  | Functionality | Grade |
| -------- | ------ | -------------------------------------------------------------------------------------------- | ------------- | ----- |
| 2-nav    | 7      | Nav with brand "VolunteerLog" and links: My Activities (`/`), Add Activity (`/activities/form`) |               |       |
| 2-layout | 3      | NavBar imported into `layout.js`, shows on every page                                        |               |       |

**Screenshot:** NavBar visible on any page

![TODO 2 - NavBar](screenshots/student_screenshots/todo2-navbar.png)

---

## TODO 3: My Activities (25 pts)

### `ActivityCard.jsx` - 10 pts

| Check  | Points | Description                                                                                          | Functionality | Grade |
| ------ | ------ | ---------------------------------------------------------------------------------------------------- | ------------- | ----- |
| TODO 3 | 10     | Cards show image, title, date, category badge, status badge, View Details link to `/activities/<id>`, delete button (organization + hours + description live on the detail page) |               |       |

### `page.js` - 15 pts

| Check   | Points | Description                                                                                          | Functionality | Grade |
| ------- | ------ | ---------------------------------------------------------------------------------------------------- | ------------- | ----- |
| TODO 3a | 2      | Three `useState` declarations (activities, filter, deleteId)                                         |               |       |
| TODO 3b | 4      | `loadActivities` fetches `/api/activities?filter=<category>` + `useEffect` on filter                 |               |       |
| TODO 3c | 2      | `handleDelete` calls action, clears deleteId, removes from state                                     |               |       |
| TODO 3d | 3      | Category `<select>` dropdown wired to state (All / Education / Health / Environment / Community)     |               |       |
| TODO 3e | 2      | Maps activities to `<ActivityCard>` + empty state                                                    |               |       |
| TODO 3f | 2      | Modal conditional + Delete/Cancel wired                                                              |               |       |

**Screenshot:** My Activities page with cards + delete modal open

![TODO 3 - My Activities](screenshots/student_screenshots/todo3-activities.png)

![TODO 3 - Delete modal](screenshots/student_screenshots/todo3-delete.png)

---

## TODO 4: Activity Detail page (15 pts)

`app/activities/[id]/page.jsx` - server component reading the repo by id.

| Check   | Points | Description                                                                                       | Functionality | Grade |
| ------- | ------ | ------------------------------------------------------------------------------------------------- | ------------- | ----- |
| TODO 4a | 3      | Awaits `params`, fetches via `activitiesRepo.getById(id)`, calls `notFound()` for missing ids     |               |       |
| TODO 4b | 3      | Long-form date formatted with `toLocaleDateString`                                                |               |       |
| TODO 4c | 5      | Renders cover image, both badges, title, organization, and `<dl>` metadata block                  |               |       |
| TODO 4d | 4      | Renders the description with a placeholder fallback when empty                                    |               |       |

**Screenshot:** Detail page for any activity

![TODO 4 - Activity Detail](screenshots/student_screenshots/todo4-detail.png)

---

## TODO 5: Server Actions + Form (35 pts)

### `activityActions.js` - 15 pts

| Check   | Points | Description                                                                                | Functionality | Grade |
| ------- | ------ | ------------------------------------------------------------------------------------------ | ------------- | ----- |
| TODO 5a | 10     | Reads formData, converts hours, validates, creates, revalidates + redirects                |               |       |
| TODO 5b | 5      | Deletes via repo + revalidates                                                             |               |       |

### `ActivityForm.jsx` - 20 pts

| Check        | Points | Description                                                                  | Functionality | Grade |
| ------------ | ------ | ---------------------------------------------------------------------------- | ------------- | ----- |
| TODO 5c      | 4      | `useActionState` wired                                                       |               |       |
| TODO 5d      | 6      | All fields bound (title, organization, hours, category, status, image, date) |               |       |
| TODO 5e      | 3      | New `description` textarea bound                                             |               |       |
| TODO 5f      | 3      | Button disabled while pending, shows "Saving..."                             |               |       |
| *(errors)*   | 4      | Invalid inputs show error styling + message                                  |               |       |

**Screenshot:** Form with description textarea + validation errors shown

![TODO 5 - Form](screenshots/student_screenshots/todo5-form.png)

---

## Summary

| TODO                    | Points         | Grade |
| ----------------------- | -------------- | ----- |
| 1 - API Routes          | /25            |       |
| 2 - NavBar              | /10            |       |
| 3 - My Activities       | /25            |       |
| 4 - Activity Detail     | /15            |       |
| 5 - Actions + Form      | /35            |       |
| **Total**               | **/110**       |       |
| Screenshots penalty     |                |       |
| **Final Grade**         |                |       |
