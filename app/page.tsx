import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import WhyUs from "@/components/WhyUs";
import About from "@/components/About";
import RecentWork from "@/components/RecentWork";
import FAQ from "@/components/FAQ";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <Reviews />
      <WhyUs />
      <About />
      <RecentWork />
      <FAQ />
      <CtaSection />
      <Footer />
    </>
  );
}
