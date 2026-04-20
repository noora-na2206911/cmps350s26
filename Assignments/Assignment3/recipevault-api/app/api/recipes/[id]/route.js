import recipesRepo from "@/repos/RecipesRepo";

export async function GET(request, { params }) {
  const recipe = await recipesRepo.getById(params.id);

  if (!recipe) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(recipe);
}

export async function PUT(request, { params }) {
  const body = await request.json();

  const updated = await recipesRepo.update(params.id, body);

  if (!updated) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(updated);
}

export async function DELETE(request, { params }) {
  const deleted = await recipesRepo.delete(params.id);

  if (!deleted) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ message: "Recipe deleted" });
}
