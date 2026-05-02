// TODO: Build the Dashboard page as a Server Component.
//
// - Load all recipes from the repo on the server (no fetch needed — call the repo directly).
// - Compute summary stats: total number of recipes, average prep time, average cook time.
// - Display the stats inside a "stats-grid" with one "stat-card" per metric.
// - Add navigation links (or buttons) to the recipes list and the add-recipe form.
//
// Reference: the vanilla client's landing page (public/client/index.html) and the
// /api/recipes/stats endpoint show the same metrics — match those.

import recipesRepo from "@/repos/RecipesRepo";
import Link from "next/link";

export default async function Home() {
    const recipes = await recipesRepo.getAll();

    const total = recipes.length;

    const avgPrep =
        total === 0 ? 0 :
        Math.round((recipes.reduce((s, r) => s + r.prepTime, 0) / total) * 10) / 10;

    const avgCook =
        total === 0 ? 0 :
        Math.round((recipes.reduce((s, r) => s + r.cookTime, 0) / total) * 10) / 10;

    return (
        <main className="page">
            <h1>RecipeVault Dashboard</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Recipes</h3>
                    <p className="stat-number">{total}</p>
                </div>

                <div className="stat-card">
                    <h3>Avg Prep Time</h3>
                    <p className="stat-number">{avgPrep} min</p>
                </div>

                <div className="stat-card">
                    <h3>Avg Cook Time</h3>
                    <p className="stat-number">{avgCook} min</p>
                </div>
            </div>

            <div className="page-header">
                <h2>Quick Links</h2>
            </div>

            <ul>
                <li><Link href="/recipes">Browse Recipes</Link></li>
                <li><Link href="/recipes/form">Add Recipe</Link></li>
            </ul>
        </main>
    );
}
