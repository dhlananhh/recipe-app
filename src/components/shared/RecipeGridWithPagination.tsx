"use client";


import React, { useState } from "react";
import { Recipe } from "@/types";
import { RecipeCard } from "./RecipeCard";
import { Button } from "@/components/ui/button";


interface RecipeGridWithPaginationProps {
  recipes: Recipe[];
}


const RECIPES_PER_PAGE = 20;


export function RecipeGridWithPagination({ recipes }: RecipeGridWithPaginationProps) {
  const [ currentPage, setCurrentPage ] = useState(1);

  const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE);

  const indexOfLastRecipe = currentPage * RECIPES_PER_PAGE;
  const indexOfFirstRecipe = indexOfLastRecipe - RECIPES_PER_PAGE;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          currentRecipes.map(recipe => (
            <RecipeCard key={ recipe.idMeal } recipe={ recipe } />
          ))
        }
      </div>

      <div className="flex justify-center items-center gap-4 mt-12">
        <Button
          onClick={ () => paginate(currentPage - 1) }
          disabled={ currentPage === 1 }
        >
          &larr; Previous
        </Button>

        <span className="text-sm font-medium">
          Page { " " } { currentPage } of { " " } { totalPages }
        </span>

        <Button
          onClick={ () => paginate(currentPage + 1) }
          disabled={ currentPage === totalPages }
        >
          Next &rarr;
        </Button>
      </div>
    </div>
  );
}
