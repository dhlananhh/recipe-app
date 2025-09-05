import { Recipe, RecipeDetails } from "@/types";


const API_BASE_URL_V2 = "https://www.themealdb.com/api/json/v2/9973533";
const API_BASE_URL_V1 = "https://www.themealdb.com/api/json/v1/1";


export async function searchRecipes(query: string): Promise<Recipe[]> {
  try {
    const response = await fetch(`${API_BASE_URL_V1}/search.php?s=${query}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Failed to search recipes:", error);
    return [];
  }
}


export async function getRecipeDetails(id: string): Promise<RecipeDetails | null> {
  try {
    const response = await fetch(`${API_BASE_URL_V1}/lookup.php?i=${id}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.meals ? data.meals[ 0 ] : null;
  } catch (error) {
    console.error("Failed to get recipe details:", error);
    return null;
  }
}


export async function getRandomRecipes(): Promise<Recipe[]> {
  try {
    const response = await fetch(`${API_BASE_URL_V2}/randomselection.php`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Failed to get random selection of recipes:", error);
    return [];
  }
}
