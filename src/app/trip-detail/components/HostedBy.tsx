import { CircleCheck, ShieldCheck, Star } from "lucide-react";
//import Image from "next/image";
import { tripData } from "../data";

export default function HostedBy() {
    const { host } = tripData;

    return (
        <section className="bg-background  p-4 shadow  w-full border border-gray-300">
            <h3 className="font-bold">{host.role}</h3>

            <div className="mt-2 flex items-start gap-3">
                {/* Avatar */}
                <div className="shrink-0">
                    {/* <Image
                        src={host.avatar}
                        alt={host.name}
                        width={64}
                        height={64}
                        className="rounded-full object-cover "
                    /> */}
                    <img
                        src={host.avatar}
                        alt={host.name}
                        className="w-16 h-16 rounded-full object-cover "
                    />
                </div>

                {/* Host content */}
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg truncate ">{host.name}</span>
                        <span>{host.verified ? <CircleCheck size={20} className="fill-green-500 text-white text-xs mt-0.5" /> : ""}</span>
                    </div>

                    <div className="flex flex-wrap gap-5 text-xs">
                        <span className="flex items-center gap-1"><Star size={15} className="text-yellow-300 fill-yellow-300" /> {host.rating}</span>
                        <span className="flex items-center gap-1 "> <ShieldCheck size={18} className="text-white fill-gray-700" />  {host.safetyScore}% </span>
                    </div>

                    <span className="mt-2 text-sm leading-snug">{host.bio}</span>

                </div>
            </div>
        </section>
    );

}
