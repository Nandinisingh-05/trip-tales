

export default function Stats() {
return(

<section className="py-24">
  <div className="max-w-7xl mx-auto px-6">

    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

      <div>
        <h2 className="text-5xl font-bold text-blue-500">
          500+
        </h2>

        <p className="mt-3 text-gray-400">
          Destinations
        </p>
      </div>

      <div>
        <h2 className="text-5xl font-bold text-blue-500">
          25K+
        </h2>

        <p className="mt-3 text-gray-400">
          Travelers
        </p>
      </div>

      <div>
        <h2 className="text-5xl font-bold text-blue-500">
          10K+
        </h2>

        <p className="mt-3 text-gray-400">
          Trips Planned
        </p>
      </div>

      <div>
        <h2 className="text-5xl font-bold text-blue-500">
          4.9★
        </h2>

        <p className="mt-3 text-gray-400">
          Average Rating
        </p>
      </div>

    </div>

  </div>
</section>
);
}