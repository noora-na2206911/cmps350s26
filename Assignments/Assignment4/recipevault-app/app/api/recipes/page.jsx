"use client";

import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { deleteRecipeAction } from "../actions/recipeActions";

export default function RecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");

    async function loadRecipes() {
        let url = "/api/recipes?";
        if (category) url += `category=${category}&`;
        if (search) url += `search=${search}`;

        const res = await fetch(url);
        const data = await res.json();
        setRecipes(data);
    }

    useEffect(() => {
        loadRecipes();
    }, [category, search]);

    async function handleDelete(id) {
        if (!confirm("Are you sure?")) return;
        await deleteRecipeAction(id);
        loadRecipes();
    }

    return (
        <main className="page">
            <h2>My Recipes</h2>

            <div className="filter-bar">
                <div className="filter-group">
                    <label>Category</label>
                    <select onChange={e => setCategory(e.target.value)}>
                        <option value="">All</option>
                        <option>Main Course</option>
                        <option>Dessert</option>
                        <option>Breakfast</option>
                        <option>Appetizer</option>
                        <option>Soup</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Search</label>
                    <input onChange={e => setSearch(e.target.value)} />
                </div>
            </div>

            <div className="recipes-grid">
                {recipes.map(r => (
                    <RecipeCard key={r.id} recipe={r} onDelete={handleDelete} />
                ))}
            </div>
        </main>
    );
}
