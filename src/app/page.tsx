import About from "@/components/layout/About";
import FeatureTest from "@/components/layout/FeatureTest";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/layout/Hero";
import HomeNav from "@/components/layout/HomeNav";

export default function Home() {
  return (
    <main className="relative ">
      <section>
        <HomeNav />
      </section>
      <section className="pb-32 px-4">
        <Hero />
      </section>
      <section id="about-us" className="sm:px-16 px-8 sm:py-24 py-12">
        <About />
      </section >
      <section id='feature-test' className="sm:px-16 px-8 sm:py-24 py-12">
        <FeatureTest />
        </section>
      <section>
        <Footer />
      </section>
    </main>
  );
}
