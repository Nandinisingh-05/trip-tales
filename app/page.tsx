import Hero from "./components/hero/Hero";
import PopularDestinations from "./components/PopularDestinations";
import WhyChoose from "./components/hero/WhyChoose";
import HowItWorks from "./components/hero/HowItWorks";
import TravelStories from "./components/hero/TravelStories";
import Stats from "./components/hero/Stats";
import CTA from "./components/hero/CTA";


export default function Home() {
  return (
    <main className="pt-20">
      <Hero />
      <PopularDestinations />
      <WhyChoose/>
      <TravelStories/>
      <HowItWorks/>
      <Stats/>
      <CTA/>
    </main>
  );
}