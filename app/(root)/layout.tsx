import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";
import RightSidebar from "@/components/shared/RightSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "ThirdWheel",
    description: "A Next.js 13 Application project",
    name = "viewport",
    content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className}`}>
                    <Topbar />

                    <main className="flex flex-row">
                        <LeftSidebar />

                        <section className="main-container">
                            <div className="w-full max-w-4xl">{children}</div>
                        </section>

                        {/* <RightSidebar /> */}
                    </main>
                    <Bottombar />
                </body>
            </html>
        </ClerkProvider>
    );
}
