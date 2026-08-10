import Link from "next/link";

export default function CTA() {
  return(
  
<section className="py-24">
  <div className="max-w-6xl mx-auto px-6">

    <div className="rounded-[40px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-16 text-center">

      <h2 className="text-6xl font-bold">
        Ready For Your Next Adventure?
      </h2>

      <p className="mt-6 text-xl text-blue-100">
        Plan your perfect trip with AI in just a few seconds.
      </p>

      <Link
        href="/plan-trip"
        className="inline-block mt-10 bg-white text-blue-700 font-bold px-10 py-5 rounded-full hover:scale-105 transition"
      >
        Plan Your Trip →
      </Link>

    </div>

  </div>
</section>
);

}