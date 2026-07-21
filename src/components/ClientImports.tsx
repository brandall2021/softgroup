"use client";

import dynamic from "next/dynamic";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

function StackSkeleton() {
  return (
    <div className="animate-pulse py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Skeleton className="h-8 w-48 mx-auto mb-4" />
        <Skeleton className="h-4 w-96 mx-auto mb-10" />
        <div className="space-y-6">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex gap-4 justify-center flex-wrap">
              {Array.from({ length: row === 1 ? 5 : 6 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-28 rounded-lg" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialsSkeleton() {
  return (
    <div className="animate-pulse py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <Skeleton className="h-4 w-24 mx-auto mb-3" />
          <Skeleton className="h-10 w-72 mx-auto" />
        </div>
        <div className="mx-auto max-w-3xl">
          <div className="relative min-h-[280px] rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <Skeleton className="h-8 w-8 rounded mb-6" />
            <SkeletonText lines={3} />
            <div className="mt-8 flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CalcSkeleton() {
  return (
    <div className="animate-pulse py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <Skeleton className="h-8 w-64 mx-auto mb-4" />
        <Skeleton className="h-4 w-80 mx-auto mb-10" />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-3/4 rounded-lg" />
            <Skeleton className="h-px w-full bg-slate-200" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatSkeleton() {
  return (
    <div className="fixed bottom-6 right-6 animate-pulse">
      <Skeleton className="h-14 w-14 rounded-full" />
    </div>
  );
}

export const TechStack = dynamic(() => import("@/components/TechStack"), { ssr: false, loading: () => <StackSkeleton /> });
export const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false, loading: () => <TestimonialsSkeleton /> });
export const BudgetCalculator = dynamic(() => import("@/components/BudgetCalculator"), { ssr: false, loading: () => <CalcSkeleton /> });
export const ChatWidget = dynamic(() => import("@/components/ChatWidget"), { ssr: false, loading: () => <ChatSkeleton /> });
