import React from "react";
import { getAllCategories } from "@/lib/api";
import { CategoryCard } from "@/components/shared/CategoryCard";


export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Explore Categories
        </h1>
        <p className="text-muted-foreground mt-2">
          Find recipes by type of meal.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {
          categories.map((category) => (
            <CategoryCard
              key={ category.idCategory }
              category={ category }
            />
          ))
        }
      </div>
    </div>
  );
}
