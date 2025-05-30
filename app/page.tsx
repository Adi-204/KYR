import Navbar from "@/components/Navbar"
import HeroSection from "./HeroSection"
import FeatureSection from "./FeatureSection"
import WorkSection from "./WorkSection"
import Testimonials from "./Testimonials"
import Pricing from "./Pricing"
import CTASection from "./CTASection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <WorkSection />
        <Testimonials />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}