import { Copy, MessageCircle, Share2, Twitter } from "lucide-react";
import Image from "next/image";

export default function TripRoadmapCard() {
  return (
    <div className="w-full space-y-4">

      {/* Trip Roadmap Card */}
      <div className="w-full border border-gray-300 p-4 shadow-sm bg-white rounded-none">
        <h2 className="text-lg font-semibold mb-3">Trip Roadmap</h2>

        <div className="overflow-hidden border border-gray-100 rounded-none">

          <Image
            src="/map.svg"
            alt="Trip Map"
            width={400}
            height={400}
            className="w-full h-60 object-cover rounded-none"
          />
        </div>
      </div>



      {/* Share Trip Section */}
      <div className="w-full border border-gray-300 p-4 shadow-sm bg-white flex flex-col gap-[15px]">

        <h2 className="mb-3 text-1xl font-semibold">Share this trip</h2>


        <div className="flex items-center justify-between">


          <div className="flex items-center gap-10">
            <button className="p-2 rounded-full border hover:bg-gray-100">
              <Share2 size={18} />
            </button>

            <button className="p-2 rounded-full border hover:bg-gray-100">
              <Twitter size={18} />
            </button>

            <button className="p-2 rounded-full border hover:bg-gray-100">
              < MessageCircle size={18} />
            </button>
          </div>

          {/* Copy button RIGHT side */}
          <button className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-gray-900">
            <Copy size={16} />
            Copy
          </button>

        </div>
      </div>
    </div>
  );
}
