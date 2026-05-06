"use client";

import Link from "next/link";
export default function navBarHTML() {
    return (
        <nav class="navbar">
            <Link href="/client/index.html" class="brand">VolunteerLog</Link>
            <ul class="nav-links">
                <li>< Link href="/client/index.html">My Activities</ Link></li>
                <li>< Link href="/client/pages/activity-form.html">Add Activity</ Link></li>
            </ul>
        </nav>
    );
}

   
