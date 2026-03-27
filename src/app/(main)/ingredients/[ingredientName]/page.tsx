import { getRecipesByIngredient } from "@/lib/api";
import { RecipeCard } from "@/components/shared/RecipeCard";

interface IngredientPageProps {
  params: Promise<{
    ingredientName: string;
  }>;
}

export default async function IngredientPage({ params }: IngredientPageProps) {
  const resolvedParams = await params;
  const ingredientName = decodeURIComponent(resolvedParams.ingredientName);

  const recipes = await getRecipesByIngredient(ingredientName);

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-6">
        Recipes with ingredient: { " " }
        <span className="text-primary capitalize">
          { ingredientName }
        </span>
      </h1>

      {
        recipes && recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
              recipes.map((recipe) => (
                <RecipeCard
                  key={ recipe.idMeal }
                  recipe={ recipe }
                />
              ))
            }
          </div>
        ) : (
          <div className="text-center mt-10 border rounded-lg p-12">
            <h3 className="text-xl font-semibold">No recipes found.</h3>
            <p className="mt-2 text-muted-foreground">
              We couldn't find any recipes containing "{ ingredientName }".
            </p>
          </div>
        )
      }
    </div>
  )
}
