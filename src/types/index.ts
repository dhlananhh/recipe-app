export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
}

export interface RecipeDetails extends Recipe {
  strInstructions: string;
  strTags: string | null;
  strYoutube: string;
  [ key: string ]: string | null;
}

export type Ingredient = {
  name: string;
  measure: string;
};
