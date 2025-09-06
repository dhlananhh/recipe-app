import { getRecipesByCategory } from "@/lib/api";
import { RecipeCard } from "@/components/shared/RecipeCard";


interface CategoryPageProps {
  params: {
    categoryName: string;
  };
}


export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = decodeURIComponent(params.categoryName);
  const recipes = await getRecipesByCategory(categoryName);

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-6">
        Recipes in: { " " }
        <span className="text-primary">
          { categoryName }
        </span>
      </h1>
      { recipes && recipes.length > 0 ? (
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
        <div className="text-center mt-10">
          <p className="text-lg text-muted-foreground">
            No recipes found for this category.
          </p>
        </div>
      ) }
    </div>
  )
}
