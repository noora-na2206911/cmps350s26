import "./globals.css";

export const metadata = {
    title: "VolunteerLog",
    description: "Volunteer Activity Tracker"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
