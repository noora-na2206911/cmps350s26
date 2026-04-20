import recipesRepo from "@/repos/RecipesRepo";

export async function GET(request) {
  const recipes = await recipesRepo.getAll();

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  let result = recipes;

  if (category) {
    result = result.filter(r => r.category === category);
  }

  if (search) {
    result = result.filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return Response.json(result);
}

export async function POST(request) {
  const body = await request.json();

  const required = ["name", "category", "prepTime", "cookTime", "servings"];

  for (let field of required) {
    if (!body[field]) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }
  }

  const newRecipe = await recipesRepo.create(body);

  return Response.json(newRecipe, { status: 201 });
}

