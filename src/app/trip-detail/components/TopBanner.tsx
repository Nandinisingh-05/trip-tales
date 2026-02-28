"use client";
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import React from 'react';

const BeachHeroSection: React.FC = () => {
  function onBack(event: React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
  window.history.back();
}

  return (
    <div className=" bg-gray-50">

      <div className="relative w-full h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col">
          <div className="p-6">
            <button
            onClick={onBack}
             className="flex items-center gap-2 text-black font-bold hover:text-white transition-colors group"
             >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
           <span className="font-medium">Back</span>
          </button>
          </div>

          <div className="mt-auto p-6 pb-8">
            <div className="inline-block mb-3">
              <span className="bg-red-400 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                Beach & Culture
              </span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-3 leading-tight">
              Bali Beach & Culture Adventure
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Bali, Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>10 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeachHeroSection