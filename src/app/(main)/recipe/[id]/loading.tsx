import React from "react";
import { Skeleton } from "@/components/ui/skeleton";


export default function RecipeDetailLoading() {
  return (
    <div className="container py-8 max-w-4xl">
      <Skeleton className="h-12 w-3/4 mb-4" />
      <Skeleton className="h-6 w-1/4 mb-6" />

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Skeleton className="w-full aspect-square rounded-lg" />
        <div>
          <Skeleton className="h-8 w-1/3 mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      </div>

      <div>
        <Skeleton className="h-8 w-1/3 mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/6" />
        </div>
      </div>
    </div>
  );
}
