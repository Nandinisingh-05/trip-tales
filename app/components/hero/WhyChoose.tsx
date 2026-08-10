export default function WhyChoose() {
  
 return(
<section className="py-24 bg-[#0b1120]">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <p className="text-blue-400 font-semibold">
        WHY CHOOSE US
      </p>

      <h2 className="text-5xl font-bold mt-3">
        Travel Smarter
      </h2>

      <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
        Everything you need to plan your perfect trip in one place.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">

      <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
        <div className="text-5xl">🤖</div>

        <h3 className="text-2xl font-bold mt-6">
          AI Trip Planner
        </h3>

        <p className="text-gray-400 mt-4">
          Generate personalized itineraries instantly.
        </p>
      </div>

      <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
        <div className="text-5xl">💰</div>

        <h3 className="text-2xl font-bold mt-6">
          Budget Friendly
        </h3>

        <p className="text-gray-400 mt-4">
          Find destinations based on your budget.
        </p>
      </div>

      <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
        <div className="text-5xl">📍</div>

        <h3 className="text-2xl font-bold mt-6">
          Hidden Gems
        </h3>

        <p className="text-gray-400 mt-4">
          Explore places beyond the tourist attractions.
        </p>
      </div>

    </div>

  </div>
</section>
);

}