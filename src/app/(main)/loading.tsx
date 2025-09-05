"use client";


import React from "react";
import { Skeleton } from "@/components/ui/skeleton";


export default function HomeLoading() {
  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-8 md:mb-10">
        <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>

      <div className="flex justify-center mb-12 md:mb-16">
        <Skeleton className="h-10 w-full max-w-xl" />
      </div>

      <div>
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {
            Array.from({ length: 10 }).map((_, i) => (
              <div key={ i } className="space-y-3">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
