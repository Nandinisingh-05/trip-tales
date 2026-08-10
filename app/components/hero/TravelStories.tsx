import Link from "next/link";
import Image from "next/image";


export default function TravelStories() {
return(
<section className="py-24 bg-[#0b1120]">
  <div className="max-w-7xl mx-auto px-6">

    <div className="flex justify-between items-center mb-12">
      <h2 className="text-5xl font-bold">
        Travel Stories
      </h2>

      <Link
        href="/stories"
        className="text-blue-500 font-semibold"
      >
        View All →
      </Link>
    </div>

    <div className="grid md:grid-cols-3 gap-8">

      {[1,2,3].map((item)=>(
        <div
          key={item}
          className="rounded-3xl overflow-hidden bg-white/5"
        >

         <div className="relative h-64 w-full">
          <Image
            src={`/stories/story${item}.jpg`}
                  alt={`Travel Story ${item}`}
            fill
           sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover"
          />
          </div>

          <div className="p-6">

            <h3 className="font-bold text-2xl">
              Amazing Journey
            </h3>

            <p className="text-gray-400 mt-3">
              Discover unforgettable experiences across India.
            </p>

          </div>

        </div>
      ))}

    </div>

  </div>
</section>

);
}