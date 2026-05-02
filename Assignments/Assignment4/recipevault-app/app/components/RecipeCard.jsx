"use client";

import Link from "next/link";

export default function RecipeCard({ recipe, onDelete }) {
    return (
        <div className="recipe-card">
            <img src={recipe.image} className="recipe-card-img" />

            <div className="recipe-card-body">
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>

                <div className="recipe-meta">
                    <span>Prep: {recipe.prepTime} min</span>
                    <span>Cook: {recipe.cookTime} min</span>
                    <span>Serves: {recipe.servings}</span>
                </div>

                <span className={`badge badge-${recipe.difficulty.toLowerCase()}`}>
                    {recipe.difficulty}
                </span>
            </div>

            <div className="recipe-card-actions">
                <Link
                    href={`/recipes/form?id=${recipe.id}&name=${recipe.name}&description=${recipe.description}&image=${recipe.image}&prepTime=${recipe.prepTime}&cookTime=${recipe.cookTime}&servings=${recipe.servings}&category=${recipe.category}&cuisine=${recipe.cuisine}&difficulty=${recipe.difficulty}&ingredients=${recipe.ingredients}`}
                    className="btn btn-primary btn-sm"
                >
                    Edit
                </Link>

                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(recipe.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
