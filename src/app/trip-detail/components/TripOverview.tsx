import { tripData } from "../data";

import {
    Bus,
    CalendarDays,
    Clock3,
    Languages,
    MapPin,
    Receipt,
    Search,
    Users,
    Users2,
    Utensils,
    Wallet
} from "lucide-react";

export default function TripOverview() {
    const overviewItems = [
        { label: "Route", value: "New Delhi, India to Bali, Indonesia", icon: MapPin },
        { label: "Dates", value: `${tripData.startDate} - ${tripData.endDate}`, icon: CalendarDays },
        { label: "Budget", value: `₹${tripData.price} / person`, icon: Wallet },
        { label: "Travelers", value: "3 / 6 joined", icon: Users },
        { label: "Group Size", value: "2-4 travelers", icon: Users2 },
        { label: "Trip Style", value: "Cultural Immersion", icon: Bus },
        { label: "Travel Style", value: "Road Trip", icon: Bus },
        { label: "Duration", value: `${tripData.days} days`, icon: Clock3 },
        { label: "Language", value: "Ukrainian, English, Polish", icon: Languages },
        { label: "Split Costs", value: "Yes", icon: Receipt },
        { label: "Looking For", value: "Male", icon: Search },
        { label: "Food Preference", value: "Non-veg", icon: Utensils },
    ];

    return (
        <section className="bg-background p-4 shadow w-full mb-4 border border-gray-300">
            <h3 className="font-bold text-base mb-2">Trip Overview</h3>
            <span className="text-sm text-gray-700 block mb-3">
                Experience the best of Bali! From stunning beaches to ancient temples, this trip combines relaxation with cultural exploration.
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {overviewItems.slice(0, 4).map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={idx}
                            className="flex flex-col items-start gap-3 border border-gray-200 bg-gray-50 px-3 py-2.5"
                        >
                            <div className="flex gap-2 items-start ">
                                <Icon className="h-5 w-5" />
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    {item.label}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {overviewItems.slice(4).map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={idx}
                            className="flex items-center gap-2 rounded-lg  px-3 py-2"
                        >
                            <div className="flex h-8 w-8 items-center justify-center text-gray-700 ">
                                <Icon className="h-4 w-4" />
                            </div>
                            <div className="leading-tight">
                                <p className="text-[11px] font-semibold text-gray-600">{item.label}</p>
                                <p className="text-xs text-gray-900">{item.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
