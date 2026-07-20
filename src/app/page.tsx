import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AIAgent from "@/components/AIAgent";
import Portfolio from "@/components/Portfolio";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import BudgetCalculator from "@/components/BudgetCalculator";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <AIAgent />
        <Stats />
        <Portfolio />
        <Process />
        <BudgetCalculator />
        <TechStack />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
