import { searchRecipesAndIngredients } from "@/lib/api";
import { RecipeCard } from "@/components/shared/RecipeCard";
import { Recipe } from "@/types";


type SearchPageProps = {
  searchParams: Promise<{
    q: string;
  }>;
};


export const dynamic = "force-dynamic";


export default async function SearchPage(props: SearchPageProps) {
  const searchParams = await props.searchParams;
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

  const recipes = await searchRecipesAndIngredients(query);

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Search Results for "{ query }"
        </h1>
        <p className="text-muted-foreground text-lg">
          Found { recipes?.length || 0 } recipes matching by name or ingredients.
        </p>
      </div>

      {
        recipes && recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
              recipes.map((recipe: Recipe) => (
                <RecipeCard
                  key={ recipe.idMeal }
                  recipe={ recipe }
                />
              ))
            }
          </div>
        ) : (
          <div className="text-center mt-10 border-2 border-dashed rounded-lg p-12">
            <h3 className="text-xl font-semibold">No results found</h3>
            <p className="text-lg text-muted-foreground mt-2">
              We couldn't find any recipes named or containing "{ query }".
              <br />
              Try searching with a different ingredient or dish name!
            </p>
          </div>
        )
      }
    </div>
  );
}
