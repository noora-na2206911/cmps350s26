"use server";

import recipesRepo from "@/repos/RecipesRepo";
import { redirect } from "next/navigation";

export async function createRecipeAction(prevState, formData) {
    const data = Object.fromEntries(formData);

    const required = ["name","description","prepTime","cookTime","servings","category","cuisine","difficulty","ingredients"];

    const errors = {};
    for (let f of required) {
        if (!data[f]) errors[f] = "Required";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    await recipesRepo.create(data);
    redirect("/recipes");
}

export async function updateRecipeAction(prevState, formData) {
    const data = Object.fromEntries(formData);

    if (!data.id) return { errors: { id: "Missing ID" } };

    await recipesRepo.update(data.id, data);
    redirect("/recipes");
}

export async function deleteRecipeAction(id) {
    await recipesRepo.delete(id);
}
