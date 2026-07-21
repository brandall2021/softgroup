import dynamic from "next/dynamic";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import { TechStack, Testimonials, BudgetCalculator, ChatWidget } from "@/components/ClientImports";

function SectionSkeleton() {
  return (
    <div className="animate-pulse py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Skeleton className="h-4 w-24 mx-auto mb-3" />
        <Skeleton className="h-8 w-56 mx-auto mb-4" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>
    </div>
  );
}

const Services = dynamic(() => import("@/components/Services"), { ssr: true, loading: () => <SectionSkeleton /> });
const AIAgent = dynamic(() => import("@/components/AIAgent"), { ssr: true, loading: () => <SectionSkeleton /> });
const Stats = dynamic(() => import("@/components/Stats"), { ssr: true, loading: () => <SectionSkeleton /> });
const Portfolio = dynamic(() => import("@/components/Portfolio"), { ssr: true, loading: () => <SectionSkeleton /> });
const Process = dynamic(() => import("@/components/Process"), { ssr: true, loading: () => <SectionSkeleton /> });
const Blog = dynamic(() => import("@/components/Blog"), { ssr: true, loading: () => <SectionSkeleton /> });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true, loading: () => <SectionSkeleton /> });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true, loading: () => <SectionSkeleton /> });

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <ErrorBoundary sectionName="Hero">
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary sectionName="Services">
          <Suspense fallback={<SectionSkeleton />}>
            <Services />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary sectionName="AIAgent">
          <Suspense fallback={<SectionSkeleton />}>
            <AIAgent />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary sectionName="Stats">
          <Suspense fallback={<SectionSkeleton />}>
            <Stats />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary sectionName="Portfolio">
          <Suspense fallback={<SectionSkeleton />}>
            <Portfolio />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary sectionName="Process">
          <Suspense fallback={<SectionSkeleton />}>
            <Process />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary sectionName="BudgetCalculator">
          <Suspense fallback={<SectionSkeleton />}>
            <BudgetCalculator />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary sectionName="TechStack">
          <Suspense fallback={<SectionSkeleton />}>
            <TechStack />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary sectionName="Testimonials">
          <Suspense fallback={<SectionSkeleton />}>
            <Testimonials />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary sectionName="Blog">
          <Suspense fallback={<SectionSkeleton />}>
            <Blog />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary sectionName="Contact">
          <Suspense fallback={<SectionSkeleton />}>
            <Contact />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
