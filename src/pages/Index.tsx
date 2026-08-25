import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Simulator from "@/components/Simulator";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CommentsSection from "@/components/CommentsSection";
import Footer from "@/components/Footer";
import HowItWorksSection from "@/components/HowItWorksSection";
import FaqSection from "@/components/FaqSection";
import { smoothScrollToSection } from "@/lib/scroll";
import Reveal from "@/components/Reveal";

const Index = () => {
  const scrollToSimulator = () => {
    smoothScrollToSection("simulador");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Reveal><HeroSection onSimulateClick={scrollToSimulator} /></Reveal>
        <Reveal scale><Simulator /></Reveal>
        <Reveal><TestimonialsSection /></Reveal>
        <Reveal><CommentsSection /></Reveal>
        <Reveal><BenefitsSection /></Reveal>
        <Reveal><HowItWorksSection /></Reveal>
        <Reveal><FaqSection /></Reveal>
      </main>
      <Reveal><Footer /></Reveal>
    </div>
  );
};

export default Index;
