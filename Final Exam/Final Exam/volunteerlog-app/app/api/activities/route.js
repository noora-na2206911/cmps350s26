import { NextResponse } from "next/server";
import activitiesRepo from "@/repos/ActivitiesRepo";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    let activities;
      if (q) {
        activities= await activitiesRepo.search(q);
    } else {
        activities= await activitiesRepo.getAll();
    }

}
    if (category) activities = activities.filter(t => t.category === category);
    return NextResponse.json(activities);

    export async function POST(request) {
    const body = await request.json();

    if (!body.description || !body.amount || !body.type || !body.category) {
        return NextResponse.json(
            { error: "image, title, date, category + status badges are required" },
            { status: 404 }
        );
    }

    const newActivity= await activitiesRepo.create(body);
    return NextResponse.json(newActivity, { status: 201 });
}
