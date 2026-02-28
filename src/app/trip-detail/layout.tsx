
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "TripDetailPage",
    description: "Complete trip information with itinerary, pricing, highlights, host and trip overview.",
};

export default function TripDetailLayout({ children }: { children: ReactNode }) {
    return (
        <main className="mx-auto">
            {children}
        </main>
    );
}
