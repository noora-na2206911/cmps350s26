import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "activities.json");

class ActivitiesRepo {
    // Used by: search(), getById(), getStats(), create(), update(), delete()
    // Reads activities.json from disk and returns the parsed array of activities.
    async getAll() {
        const data = await fs.readFile(dataPath, "utf-8");
        return JSON.parse(data);
    }

    // Used by: create(), update(), delete()
    // Writes the given array back to activities.json (pretty-printed, 4-space indent).
    async save(items) {
        await fs.writeFile(dataPath, JSON.stringify(items, null, 4));
    }

    // Used by: (not used directly in this exam, kept for completeness)
    // Returns the activity with the matching id, or undefined if not found.
    async getById(id) {
        const all = await this.getAll();
        return all.find(a => a.id === Number(id));
    }

    // Used by: app/api/activities/route.js (GET /api/activities?filter=...)
    // Returns all activities when no category given; otherwise filters by exact
    // category match (e.g. "Education"). The route should call this helper
    // instead of filtering itself.
    async filterByCategory(category) {
        const all = await this.getAll();
        if (!category) return all;
        return all.filter(a => a.category === category);
    }

    // Used by: app/actions/activityActions.js -> createActivityAction
    // Adds a new activity, auto-assigning the next id, and persists.
    async create(data) {
        const all = await this.getAll();
        const newItem = {
            id: Math.max(...all.map(a => a.id), 0) + 1,
            ...data
        };
        all.push(newItem);
        await this.save(all);
        return newItem;
    }

    // Used by: (not used directly in this exam, kept for completeness)
    // Merges the given fields onto the activity with the matching id and persists.
    async update(id, data) {
        const all = await this.getAll();
        const index = all.findIndex(a => a.id === Number(id));
        if (index === -1) return null;
        all[index] = { ...all[index], ...data, id: Number(id) };
        await this.save(all);
        return all[index];
    }

    // Used by: app/actions/activityActions.js -> deleteActivityAction
    // Removes the activity with the matching id and persists. Returns true if a row was removed.
    async delete(id) {
        const all = await this.getAll();
        const index = all.findIndex(a => a.id === Number(id));
        if (index === -1) return false;
        all.splice(index, 1);
        await this.save(all);
        return true;
    }

    // Used by: app/activities/page.jsx (the Volunteer Snapshot / stats page)
    // Returns aggregate stats so the page does not need to filter or count itself:
    //   { planned, completed, totalHours, total, breakdown: [{ name, count }, ...] }
    async getStats() {
        const all = await this.getAll();
        const categoryList = ["Education", "Health", "Environment", "Community"];
        return {
            planned: all.filter(a => a.status === "planned").length,
            completed: all.filter(a => a.status === "completed").length,
            totalHours: all.reduce((sum, a) => sum + a.hours, 0),
            total: all.length,
            breakdown: categoryList.map(name => ({
                name,
                count: all.filter(a => a.category === name).length
            }))
        };
    }
}

export default new ActivitiesRepo();
