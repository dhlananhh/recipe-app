"use client";


import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Category } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={ `/categories/${category.strCategory}` }
      className="group"
    >
      <Card className="overflow-hidden text-center hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="p-0 flex-col items-center gap-4">
          <div className="relative aspect-square w-full">
            <Image
              src={ category.strCategoryThumb }
              alt={ category.strCategory }
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="text-md font-semibold pb-4">
            { category.strCategory }
          </h3>
        </CardHeader>
      </Card>
    </Link>
  );
}
