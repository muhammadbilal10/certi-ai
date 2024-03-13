import Hero from "@/components/layout/Hero";
import HomeNav from "@/components/layout/HomeNav";
import Topnav from "@/components/layout/Topnav";

export default function Home() {
  return (
    <main className="relative">
      <HomeNav />
      <Hero />
    </main>
  );
}
