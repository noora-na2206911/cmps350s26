"use client";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { createRecipeAction, updateRecipeAction } from "../actions/recipeActions";

export default function RecipeForm() {
    const params = useSearchParams();
    const isEdit = params.get("id");

    const [state, formAction] = useActionState(
        isEdit ? updateRecipeAction : createRecipeAction,
        {}
    );

    return (
        <form action={formAction} className="form-section">
            <h2>{isEdit ? "Edit Recipe" : "Add Recipe"}</h2>

            {isEdit && <input type="hidden" name="id" defaultValue={params.get("id")} />}

            <div className="form-group">
                <label>Name</label>
                <input name="name" defaultValue={params.get("name") || ""} />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea name="description" defaultValue={params.get("description") || ""}/>
            </div>

            <div className="form-group">
                <label>Image</label>
                <input name="image" defaultValue={params.get("image") || ""}/>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Prep Time</label>
                    <input name="prepTime" defaultValue={params.get("prepTime") || ""}/>
                </div>
                <div className="form-group">
                    <label>Cook Time</label>
                    <input name="cookTime" defaultValue={params.get("cookTime") || ""}/>
                </div>
                <div className="form-group">
                    <label>Servings</label>
                    <input name="servings" defaultValue={params.get("servings") || ""}/>
                </div>
            </div>

            <button className="btn btn-primary">
                {isEdit ? "Update Recipe" : "Add Recipe"}
            </button>
        </form>
    );
}
