import { getRandomRecipes } from "@/lib/api";
import { Recipe } from "@/types";
import { RecipeCard } from "@/components/shared/RecipeCard";
import { SearchBar } from "@/components/shared/SearchBar";
import { BlurIn } from "@/components/magicui/blur-in";

export default async function HomePage() {
  const featuredRecipes = await getRandomRecipes();

  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <BlurIn>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Find Your Next Favorite Meal
          </h1>
          <p className="text-muted-foreground mt-2">
            Search from thousands of recipes across the globe.
          </p>
        </BlurIn>
      </div>

      <SearchBar />

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Recipes</h2>
        {
          featuredRecipes && featuredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {
                featuredRecipes.map((recipe: Recipe) => (
                  <RecipeCard key={ recipe.idMeal } recipe={ recipe } />
                ))
              }
            </div>
          ) : (
            <div className="text-center text-muted-foreground mt-10 border rounded-lg p-8">
              <p className="font-semibold">
                Oops! Could not load recipes.
              </p>
              <p className="text-sm mt-1">Please check your connection or try again later.</p>
            </div>
          )
        }
      </section>
    </div>
  );
}
