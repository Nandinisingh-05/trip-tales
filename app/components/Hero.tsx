import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-[650px] items-center justify-center overflow-hidden px-6 text-white">

      {/* Background Image */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Beautiful travel destination"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Hero Content */}
      <div className="relative z-10 text-center">

        <p className="mb-3 text-lg font-medium">
          Discover the world with Trip Tales
        </p>

        <h1 className="mb-5 text-5xl font-bold md:text-7xl">
          Your Journey.
          <br />
          Your Story.
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg">
          Discover breathtaking destinations, plan unforgettable adventures,
          and share your travel stories with the world.
        </p>

        <div className="mx-auto flex max-w-2xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-2xl sm:flex-row">

          <input
            type="text"
            placeholder="Where do you want to go?"
            className="flex-1 rounded-xl px-5 py-4 text-gray-900 outline-none"
          />

          <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700">
            Explore
          </button>

        </div>
      </div>
    </section>
  );
}