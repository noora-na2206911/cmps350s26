import Link from "next/link";

export default function ActivityCard({ activity, onDelete }) {
    // TODO 3: Make this card dynamic.
    //  - Replace every hardcoded value with the matching activity prop
    //  - Wire the Delete button's onClick to call onDelete(activity.id)
    //  - Wire the View Details link to navigate to the detail page (/activities/<id>)
    const percentage = Math.round((activity.spent / activity.activity) * 100);
    const color = percentage > 90 ? "danger" : percentage > 70 ? "warning" : "success";

export default function SummaryCard({ image, title, amount, category }) {
    return (
        <div className={`card card--${category}`}>
            <h3>{title}</h3>
            <p className="amount">{amount.toLocaleString()} QAR</p>
        </div>
    );
}
}
    return (
        <article className="activity-card">
            <div className="cover">
                <img src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=600" alt="Math Tutoring" />
                <span className="badge badge-completed">completed</span>
            </div>
            <div className="card-body">
                <div className="card-title-row">
                    <h3>Math Tutoring</h3>
                    <span className="badge badge-education">Education</span>
                </div>
                <p className="card-date">Mar 10, 2026</p>
                <hr className="card-divider" />
                <div className="card-actions">
                    <a href="#" className="action-link">View Details</a>
                    <button type="button" className="delete-btn" title="Delete Math Tutoring">🗑</button>
                </div>
            </div>
        </article>
    );

    const dateLabel = new Date(xxxxx).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric"
        });
    }

}
// Use this code

// const dateLabel = new Date(xxxxx).toLocaleDateString("en-US", {
 //       month: "short", day: "numeric", year: "numeric"
 //       });
    //}