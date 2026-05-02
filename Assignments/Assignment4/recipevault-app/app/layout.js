import "./globals.css";
import NavBar from "./components/NavBar";
// TODO: Import your NavBar component

export const metadata = {
    title: "RecipeVault",
    description: "Assignment 4 - Next.js Frontend with Server Actions"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <NavBar />
                {children}
            </body>
        </html>
    );
}

