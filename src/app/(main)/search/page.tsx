import { searchRecipes } from "@/lib/api";
import { RecipeCard } from "@/components/shared/RecipeCard";
import { Recipe } from "@/types";


type SearchPageProps = {
  searchParams: {
    q: string;
  };
};


export const dynamic = "force-dynamic";


export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q;

  if (!query) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold">
          Please enter a search term.
        </h1>
      </div>
    );
  }

  const recipes = await searchRecipes(query);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for "{ query }"
      </h1>
      {
        recipes && recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
              recipes.map((recipe: Recipe) => (
                <RecipeCard key={ recipe.idMeal } recipe={ recipe } />
              ))
            }
          </div>
        ) : (
          <div className="text-center mt-10">
            <p className="text-lg text-muted-foreground">
              No recipes found. Try another search!
            </p>
          </div>
        )
      }
    </div>
  );
}
