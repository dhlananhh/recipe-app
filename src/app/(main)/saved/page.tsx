import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getRecipeDetails } from "@/lib/api";
import { RecipeCard } from "@/components/shared/RecipeCard";
import { Recipe } from "@/types";
import { SavedRecipe } from "@/generated/prisma"


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
                <RecipeCard key={ recipe.idMeal } recipe={ recipe } />
              ))
            }
          </div>
        ) : (
          <div className="text-center mt-10 border rounded-lg p-8">
            <p className="text-xl font-semibold">
              No recipes saved yet!
            </p>
            <p className="text-muted-foreground mt-2">
              Start exploring and save the meals you love.
            </p>
          </div>
        )
      }
    </div>
  );
}
