import Link from "next/link";
import { notFound } from "next/navigation";
import activitiesRepo from "@/repos/ActivitiesRepo";

export default async function ActivityDetailPage({ params }) {
    // TODO 4: Make this detail page dynamic.
    //  - Fetch the activity via activitiesRepo.getById(id) and call notFound() when missing
    //  - Replace every hardcoded value below with the matching activity prop

    const [activities, setActivites] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteId, setDeleteId] = useState(null);

    async function loadActivities() {
        const url = searchTerm
            ? `/api/activities?q=${searchTerm}`
            : "/api/activities";
        const res = await fetch(url);
        const data = await res.json();
        setActivities(data);
    }

    useEffect(() => {
        loadActivities();
    }, [searchTerm]);

    async function handleDelete(id) {
        await deleteActivitiesAction(id);
        setDeleteId(null);
        setActivities(prev => prev.filter(b => b.id !== id));
    }
    async function fetchJSON() {
    const res = await fetch activitiesRepo.getById(id);
    return await res.json();
}

    return (
        <main className="page detail-page">
            <Link href="/" className="back-link">&larr; Back to My Activities</Link>
            <article className="detail-card">
                <div className="detail-cover">
                    <img src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=600" alt="Math Tutoring" />
                </div>
                <div className="detail-body">
                    <div className="detail-badges">
                        <span className="badge badge-completed">completed</span>
                        <span className="badge badge-education">Education</span>
                    </div>
                    <h1 className="detail-title">Math Tutoring</h1>
                    <p className="detail-instructor">Logged with <strong>QU Learning Center</strong></p>

                    <dl className="detail-meta">
                        <div><dt>Hours</dt><dd>4</dd></div>
                        <div><dt>When</dt><dd>Tuesday, March 10, 2026</dd></div>
                        <div><dt>Category</dt><dd>Education</dd></div>
                    </dl>

                    <h2 className="detail-section-title">About this activity</h2>
                    <p className="detail-description">
                        Weekly one-on-one math tutoring for first-year students.
                    </p>
                </div>
            </article>
        </main>
    );
}
