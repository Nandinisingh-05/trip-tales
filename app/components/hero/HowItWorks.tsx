
export default function HowItWorks(){
  return(
<section className="py-24">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold">
        How It Works
      </h2>
    </div>

    <div className="grid md:grid-cols-4 gap-8">

      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl mx-auto">
          1
        </div>

        <h3 className="mt-6 font-bold text-xl">
          Choose Destination
        </h3>
      </div>

      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl mx-auto">
          2
        </div>

        <h3 className="mt-6 font-bold text-xl">
          Select Budget
        </h3>
      </div>

      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl mx-auto">
          3
        </div>

        <h3 className="mt-6 font-bold text-xl">
          AI Creates Plan
        </h3>
      </div>

      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl mx-auto">
          4
        </div>

        <h3 className="mt-6 font-bold text-xl">
          Start Traveling
        </h3>
      </div>

    </div>

  </div>
</section>
);
}