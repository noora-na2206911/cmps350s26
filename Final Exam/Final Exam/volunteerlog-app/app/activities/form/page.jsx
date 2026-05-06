import { Suspense } from "react";
import ActivityForm from "@/app/components/ActivityForm";

export default function ActivityFormPage() {
    return (
        <Suspense>
            <ActivityForm />
        </Suspense>
    );
}
