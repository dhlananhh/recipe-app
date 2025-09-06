import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getRecipeDetails } from "@/lib/api";
import { RecipeCard } from "@/components/shared/RecipeCard";
import { Recipe } from "@/types";
import { SavedRecipe } from "@/generated/prisma";
import { SearchX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default async function SavedRecipesPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const savedRecipeLinks = await prisma.savedRecipe.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const savedRecipesPromises = savedRecipeLinks.map((link: SavedRecipe) =>
    getRecipeDetails(link.recipeId)
  );

  const savedRecipes = (await Promise.all(savedRecipesPromises)).filter(Boolean) as Recipe[];

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">
        Your Saved Recipes
      </h1>
      {
        savedRecipes && savedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
              savedRecipes.map((recipe) => (
                <RecipeCard
                  key={ recipe.idMeal }
                  recipe={ recipe }
                />
              ))
            }
          </div>
        ) : (
          <div className="text-center mt-10 border-2 border-dashed rounded-lg p-12">
            <SearchX className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">
              No Saved Recipes Yet!
            </h3>
            <p className="mt-2 text-muted-foreground">
              Looks like you haven't saved any recipes.
              <br />
              Start exploring and save the ones you love.
            </p>
            <Button asChild className="mt-6">
              <Link href="/">
                Explore Recipes
              </Link>
            </Button>
          </div>
        ) }
    </div>
  )
}
