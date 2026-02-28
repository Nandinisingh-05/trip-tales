import HostedBy from "./components/HostedBy";
import JoinedTravellers from "./components/JoinedTravellers";
import TopSection from "./components/TopBanner";
import TripDuration from "./components/TripDuration";
import TripHighlights from "./components/TripHighlights";
import TripOverview from "./components/TripOverview";
import TripRoadmapCard from "./components/TripRoadmapCard";

export default function TripDetailPage() {
    return (
        <div className="flex flex-col ">
            {/* TopSection (hero / summary area) */}
            <div className="w-full">
                <TopSection />
            </div>

            <div className="px-10 py-7 ">
                <div className=" flex flex-col md:flex-row gap-5 ">
                    <div className=" flex-3/4 flex flex-col gap-5">
                        <TripOverview />
                        <TripHighlights />
                        {/* <ItineraryList />
                        <SafetyInfo /> */}
                    </div>

                    <div className="flex-1/4">
                        <div className="flex flex-col gap-5">
                            <TripDuration />
                            <HostedBy />
                            <JoinedTravellers />
                            <TripRoadmapCard />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-4 border border-gray-300 p-5">
                    <h2 className="font-semibold">Similar Trip</h2>
                    <div className="flex gap-4">
                        <div className="w-32 h-40 bg-blue-300"></div>
                        <div className="w-32 h-40 bg-blue-300"></div>
                        <div className="w-32 h-40 bg-blue-300"></div>
                        <div className="w-32 h-40 bg-blue-300"></div>
                    </div>
                </div>
            </div>
        </div >
    )
}