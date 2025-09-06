import { getAllRecipes } from "@/lib/api";
import { RecipeGridWithPagination } from "@/components/shared/RecipeGridWithPagination";


export const revalidate = 86400;


export default async function AllRecipesPage() {
  const allRecipes = await getAllRecipes();

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          All Recipes
        </h1>
        <p className="text-muted-foreground mt-2">
          Browse our full collection of { " " } { allRecipes.length } { " " } recipes from A to Z.
        </p>
      </div>

      <RecipeGridWithPagination recipes={ allRecipes } />
    </div>
  );
}
