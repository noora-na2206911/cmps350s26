import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "recipes.json");

class RecipesRepo {
  async getAll() {
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  }

  async getById(id) {
    const recipes = await this.getAll();
    return recipes.find(r => r.id === Number(id));
  }

  async create(data) {
    const recipes = await this.getAll();

    const newRecipe = {
      ...data,
      id: recipes.length ? recipes[recipes.length - 1].id + 1 : 1,
      prepTime: Number(data.prepTime),
      cookTime: Number(data.cookTime),
      servings: Number(data.servings)
    };

    recipes.push(newRecipe);
    await writeFile(filePath, JSON.stringify(recipes, null, 2));

    return newRecipe;
  }

  async update(id, data) {
    const recipes = await this.getAll();
    const index = recipes.findIndex(r => r.id === Number(id));

    if (index === -1) return null;

    const updated = {
      ...recipes[index],
      ...data,
      prepTime: data.prepTime ? Number(data.prepTime) : recipes[index].prepTime,
      cookTime: data.cookTime ? Number(data.cookTime) : recipes[index].cookTime,
      servings: data.servings ? Number(data.servings) : recipes[index].servings
    };

    recipes[index] = updated;

    await writeFile(filePath, JSON.stringify(recipes, null, 2));

    return updated;
  }

  async delete(id) {
    const recipes = await this.getAll();
    const newRecipes = recipes.filter(r => r.id !== Number(id));

    if (recipes.length === newRecipes.length) return false;

    await writeFile(filePath, JSON.stringify(newRecipes, null, 2));
    return true;
  }
}

export default new RecipesRepo();


