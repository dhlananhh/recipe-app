import React from "react";
import { getRecipeDetails } from "@/lib/api";
import { Ingredient, RecipeDetails } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Youtube,
  Bookmark,
  Layers,
  MapPin,
  ChefHat
} from "lucide-react";
import SaveRecipeButton from "@/components/shared/SaveRecipeButton";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;

  const {
    id
  } = params;

  const recipe = await getRecipeDetails(id);
  if (!recipe)
    return { title: "Recipe Not Found" };

  return {
    title: `${recipe.strMeal} | Culinary`,
    description: `Learn how to cook ${recipe.strMeal}. ${recipe.strInstructions.substring(0, 150)}...`,
    openGraph: {
      images: [ { url: recipe.strMealThumb, width: 1200, height: 630, alt: recipe.strMeal } ],
    },
  };
}


const getIngredients = (recipe: RecipeDetails): Ingredient[] => {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof RecipeDetails;
    const measureKey = `strMeasure${i}` as keyof RecipeDetails;
    if (recipe[ ingredientKey ]) {
      ingredients.push({ name: recipe[ ingredientKey ]!, measure: recipe[ measureKey ] || "" });
    } else {
      break;
    }
  }
  return ingredients;
};


async function checkIsSaved(recipeId: string): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) return false;
  const savedRecipe = await prisma.savedRecipe.findUnique({
    where: { userId_recipeId: { userId, recipeId } }
  });
  return !!savedRecipe;
}


export default async function RecipeDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const {
    id
  } = params;

  const recipe = await getRecipeDetails(id);

  if (!recipe) {
    notFound();
  }

  const [ ingredients, isSaved ] = await Promise.all([
    getIngredients(recipe),
    checkIsSaved(id)
  ]);

  return (
    <div className="container py-8 md:py-12 max-w-6xl mx-auto">
      <section className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          { recipe.strMeal }
        </h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin size={ 16 } />
            <span>
              { recipe.strArea }
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Layers size={ 16 } />
            <span>
              { recipe.strCategory }
            </span>
          </div>
        </div>
        {
          recipe.strTags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {
                recipe.strTags.split(",").map(tag => (
                  <Badge
                    key={ tag }
                    variant="secondary"
                  >
                    { tag.trim() }
                  </Badge>
                ))
              }
            </div>
          )
        }
      </section>
      <main className="lg:grid lg:grid-cols-3 lg:gap-12">

        <div className="lg:col-span-2 space-y-8">
          <div className="relative aspect-video w-full">
            <Image
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <ChefHat />
                Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-4 text-md leading-relaxed">
                {
                  recipe.strInstructions
                    .split(/\r?\n/).filter(line => line.trim() !== "")
                    .map((step, index) => (
                      <li key={ index }>{ step }</li>
                    ))
                }
              </ol>
            </CardContent>
          </Card>
        </div>

        <aside className="lg:col-span-1 mt-8 lg:mt-0 lg:sticky lg:top-24 h-fit">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl">
                Ingredients
              </CardTitle>
              <CardDescription>
                { ingredients.length } items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {
                  ingredients.map((ing, index) => (
                    <li
                      key={ index }
                      className="flex justify-between items-baseline pb-2 border-b last:border-none"
                    >
                      <span className="font-medium">
                        { ing.name }
                      </span>
                      <span className="text-sm text-muted-foreground text-right">
                        { ing.measure }
                      </span>
                    </li>
                  ))
                }
              </ul>
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-col sm:flex-row lg:flex-col gap-4">
            <SaveRecipeButton
              recipeId={ recipe.idMeal }
              isInitiallySaved={ isSaved }
            />
            {
              recipe.strYoutube && (
                <Link
                  href={ recipe.strYoutube }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-white bg-red-600 hover:bg-red-700 font-semibold px-4 py-2 rounded-md transition-colors"
                >
                  <Youtube size={ 18 } />
                  Watch Tutorial
                </Link>
              )
            }
          </div>
        </aside>
      </main>
    </div>
  );
}
