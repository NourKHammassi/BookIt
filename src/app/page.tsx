import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import FeaturedStays from "@/components/FeaturedStays";
import WhyBookIt from "@/components/WhyBookIt";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <SearchBar />
      <FeaturedStays />
      <WhyBookIt />
      <Footer />
    </div>
  );
}