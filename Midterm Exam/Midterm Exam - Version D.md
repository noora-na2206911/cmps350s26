<p align="center">
<strong>Qatar University</strong><br>
College of Engineering - Department of Computer Science and Engineering<br>
<strong>CMPS 350 - Web Development</strong>
</p>

---

# Midterm Exam: Section B54 - Fitness Tracker

**Duration:** 120 minutes
**Total Marks:** 100

---

## Exam Rules

1. This is an **open-book, individual exam**. You may refer to your notes, lab code, and course materials.
2. **No AI tools** (ChatGPT, GitHub Copilot, Claude, Gemini, etc.) may be used during the exam.
3. **No communication** with other students during the exam.
4. Any use of AI tools or sharing of answers will be treated as an **academic integrity breach** under [Qatar University's Student Code of Conduct](https://www.qu.edu.qa/en-us/students/resources/Pages/code-of-conduct.aspx) and will result in a **zero grade** for the exam.

---

## Instructions

You are provided with an HTML page, a styled CSS file, and a starter JavaScript file. Complete the TODO items to make the application functional.

- **Do not modify the HTML structure.**
- **Do not remove the TODO comments from your code or you will receive a zero.** Write your solution below each TODO.

---

## API Endpoints

**Base URL:** `https://exam-api-nine.vercel.app`

**Full API documentation:** [https://exam-api-nine.vercel.app/docs/workouts](https://exam-api-nine.vercel.app/docs/workouts)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/workouts` | Get all workouts |
| GET | `/workouts?activity=Running` | Get workouts filtered by activity |
| GET | `/activities/workouts` | Get list of available activities |
| POST | `/workouts` | Add a new workout |
| DELETE | `/workouts/:id` | Delete a workout |
| POST | `/reset/workouts` | Reset to default data |

### Data Structure

```json
{
  "id": 1,
  "exercise": "Morning Run",
  "calories": 450,
  "type": "cardio",
  "category": "Running",
  "date": "2026-03-01"
}
```

---

## TODO Breakdown

| TODO | Points | Description |
|------|--------|-------------|
| 1 | 10 | CSS timeline layout for workout log (vertical line + dots) |
| 2 | 35 | Fetch workouts from the API and display them as log entries |
| 3 | 20 | Populate the activity dropdown from the API and filter workouts by activity |
| 4 | 15 | Delete a workout with confirmation |
| 5 | 20 | Add a new workout via POST |
| **Total** | **100** | |

---

## Expected Output

### TODO 1 & 2: Desktop layout with workouts loaded (timeline style)

<img src="screenshots/todo2-desktop.png" width="600">

### Mobile Layout (single column)

<img src="screenshots/todo2-mobile.png" width="300">

### TODO 3: Filter dropdown populated from API

<img src="screenshots/todo3-filter.png" width="600">

### TODO 4: Delete a workout (confirmation dialog)

<img src="screenshots/todo4-delete.png" width="600">

---

## Submission

1. Save your work in `js/app.js` and `css/styles.css`.
2. Push to **your own repo** under `Midterm/` before the exam time ends.
3. After pushing, **verify your submission** by opening your repo in the browser at `https://github.com/cmps350s26/your-repo-name` and confirming the `Midterm/` folder contains your files.

Your folder should look like this:

```
Your Repo /
└── Midterm/
    ├── index.html
    ├── css/
    │   └── styles.css
    └── js/
        └── app.js
```

**Do not push after the exam ends. Late submissions will not be accepted.**
**Do not modify the HTML structure.**
**Do not remove the TODO comments from your code or you will receive a zero.** Write your solution below each TODO.

Good luck!
