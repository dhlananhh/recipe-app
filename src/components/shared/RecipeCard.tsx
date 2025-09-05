import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Recipe } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={ `/recipe/${recipe.idMeal}` }>
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="p-0">
          <div className="aspect-video relative">
            <Image
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="text-lg leading-snug">
            { recipe.strMeal }
          </CardTitle>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-sm text-muted-foreground">
            { recipe.strArea } • { recipe.strCategory }
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
