import { CircleCheck, ShieldCheck, Star } from "lucide-react";
import { tripData } from "../data";
export default function JoinedTravellers() {
    return (
        <section className="bg-background p-4 shadow w-full border border-gray-300">
         
      
        <div className="text-3xl font-bold text-gray-900 mb-1">₹ 1500</div>
        <div className="text-gray-600 mb-6">per person</div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Start Date</span>
                  <span className="text-gray-900 font-medium">Nov 15, 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">End Date</span>
                  <span className="text-gray-900 font-medium">Nov 25, 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="text-gray-900 font-medium">10 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Spots Available</span>
                  <span className="text-green-600 font-medium">3 remaining</span>
                </div>
              </div>

              <button className="w-full bg-red-400  text-white py-3 rounded-sm font-medium hover:bg-red-500 transition mb-3">
                Join this trip
              </button>
              <button className="w-full border border-black text-black py-3 rounded-sm font-medium hover:bg-gray-50 transition">
                Chat with Organizer
              </button>
            
        </section>
    );


}




