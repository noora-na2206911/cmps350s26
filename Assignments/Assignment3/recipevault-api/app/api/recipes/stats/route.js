import recipesRepo from "@/repos/RecipesRepo";

export async function GET() {
  const recipes = await recipesRepo.getAll();

  const total = recipes.length;

  const avgPrepTime =
    recipes.reduce((sum, r) => sum + r.prepTime, 0) / total || 0;

  const avgCookTime =
    recipes.reduce((sum, r) => sum + r.cookTime, 0) / total || 0;

  const byCategory = {};
  const byDifficulty = {};

  for (let r of recipes) {
    byCategory[r.category] = (byCategory[r.category] || 0) + 1;
    byDifficulty[r.difficulty] = (byDifficulty[r.difficulty] || 0) + 1;
  }

  return Response.json({
    total,
    avgPrepTime: Number(avgPrepTime.toFixed(1)),
    avgCookTime: Number(avgCookTime.toFixed(1)),
    byCategory,
    byDifficulty
  });
}

