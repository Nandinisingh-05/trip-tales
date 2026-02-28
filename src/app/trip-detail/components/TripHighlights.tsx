import { CircleCheck } from "lucide-react";
import { tripData } from "../data";

export default function TripHighlights() {
    return (
        <section id="trip-highlights" className="bg-background p-4 shadow w-full border border-gray-300">
            <h3 className="font-bold mb-3 text-base ">Trip Highlights</h3>
            <ul className="flex flex-wrap gap-4">
                {tripData.highlights.map((highlight, idx) => (
                    <li
                        key={idx}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
                    >
                        <CircleCheck size={20} className="fill-gray-700 text-white" />  {highlight}
                    </li>
                ))}
            </ul>
        </section>
    );


}
