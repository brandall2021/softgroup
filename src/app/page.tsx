import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollProgress from "@/components/ScrollProgress";

const Services = dynamic(() => import("@/components/Services"), { ssr: true });
const AIAgent = dynamic(() => import("@/components/AIAgent"), { ssr: true });
const Stats = dynamic(() => import("@/components/Stats"), { ssr: true });
const Portfolio = dynamic(() => import("@/components/Portfolio"), { ssr: true });
const Process = dynamic(() => import("@/components/Process"), { ssr: true });
const TechStack = dynamic(() => import("@/components/TechStack"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const Blog = dynamic(() => import("@/components/Blog"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });
const BudgetCalculator = dynamic(() => import("@/components/BudgetCalculator"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), {
  ssr: true,
  loading: () => null,
});

export default function Home() {
  return (
    <>
      <ScrollProgress />
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
