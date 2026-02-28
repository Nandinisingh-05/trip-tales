import { CircleCheck, ShieldCheck, Star } from "lucide-react";
import { tripData } from "../data";
export default function JoinedTravellers() {
    return (
        <section className="bg-background p-4 shadow w-full border border-gray-300">
            <h3 className="font-bold mb-3 text-base ">Joined Travellers ({tripData.joinedTravellers.length})</h3>
            <ul className="flex flex-col gap-4">
                {tripData.joinedTravellers.map((traveller, idx) => (
                    <li
                        key={idx}
                        className="flex items-center justify-between  pb-2"
                    >
                        <div className="flex gap-2">
                            <img
                                src={traveller.avatar}
                                alt={traveller.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1">
                                    <span className="font-medium truncate">{traveller.name}</span>
                                    <span className="ml-2 text-xs ">
                                        {traveller.verified ? <CircleCheck size={20} className="fill-green-500 text-white " /> : ""}
                                    </span>
                                </div>

                                <div className="flex gap-5">
                                    <span className="text-xs flex gap-1"><Star size={15} className="text-yellow-300 fill-yellow-300" /> {traveller.rating}</span>
                                    <span className="text-xs flex gap-1"><ShieldCheck size={18} className="text-white fill-gray-700" /> {traveller.safetyScore}% </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button className="h-8 p-1 px-3 bg-[#1d4350] rounded font-semibold text-xs text-white shadow hover:bg-gray-800">
                                View
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );


}




// border-b last:border-b-0