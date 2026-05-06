import { NextResponse } from "next/server";
import ativitiesRepo from "@/repos/ActivitiesRepo";

export async function GET(request, { params }) {
    const { id } = await params;
    const activity = await ativitiesRepo.getById(id);

    if (!activity) {
        return NextResponse.json({ error: "activity not found" }, { status: 404 });
    }
    return NextResponse.json(activity);
}
