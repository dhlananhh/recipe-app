import Link from "next/link";
import {
  getRandomRecipes,
  getAllCategories
} from "@/lib/api";
import { Recipe, Category } from "@/types";
import { RecipeCard } from "@/components/shared/RecipeCard";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { SearchBar } from "@/components/shared/SearchBar";
import { BlurIn } from "@/components/magicui/blur-in";
import { Button } from "@/components/ui/button";


export default async function HomePage() {
  const [ featuredRecipes, allCategories ] = await Promise.all([
    getRandomRecipes(),
    getAllCategories()
  ]);

  const featuredCategories = allCategories.slice(0, 10);

  return (
    <div className="container py-8 md:py-12 space-y-12 md:space-y-16">
      <section className="text-center">
        <BlurIn>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Find Your Next Favorite Meal
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">
            Discover, cook, and save amazing recipes from thousands of public collections around the world.
          </p>
        </BlurIn>
        <div className="mt-8">
          <SearchBar />
        </div>
      </section>

      {
        featuredCategories && featuredCategories.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                Explore Categories
              </h2>
              <Button
                asChild
                variant="link"
                className="text-primary pr-0"
              >
                <Link href="/categories">
                  View All Categories &rarr;
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {
                featuredCategories.map((category: Category) => (
                  <CategoryCard
                    key={ category.idCategory }
                    category={ category }
                  />
                ))
              }
            </div>
          </section>
        )
      }

      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Featured Recipes
        </h2>
        {
          featuredRecipes && featuredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {
                featuredRecipes.map((recipe: Recipe) => (
                  <RecipeCard
                    key={ recipe.idMeal }
                    recipe={ recipe }
                  />
                ))
              }
            </div>
          ) : (
            <div className="text-center text-muted-foreground mt-10 border rounded-lg p-8">
              <p className="font-semibold">
                Oops! Could not load recipes.
              </p>
              <p className="text-sm mt-1">
                Please check your connection or try again later.
              </p>
            </div>
          )
        }
      </section>
    </div>
  );
}
