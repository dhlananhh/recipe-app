import {
  Recipe,
  RecipeDetails,
  Category
} from "@/types";


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


export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL_V1}/categories.php`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error("Failed to get all categories:", error);
    return [];
  }
}


export async function getRecipesByCategory(categoryName: string): Promise<Recipe[]> {
  try {
    const response = await fetch(`${API_BASE_URL_V1}/filter.php?c=${categoryName}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error(`Failed to get recipes for category ${categoryName}:`, error);
    return [];
  }
}


export async function getAllRecipes(): Promise<Recipe[]> {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  console.log("Starting to fetch all recipes...");

  try {
    const promises = alphabet.map(letter =>
      fetch(`${API_BASE_URL_V1}/search.php?f=${letter}`).then(res => res.json())
    );

    const results = await Promise.all(promises);

    const allMeals = results.flatMap(result => result.meals || []);

    const uniqueMealsMap = new Map<string, Recipe>();
    allMeals.forEach(meal => {
      if (meal && meal.idMeal) {
        uniqueMealsMap.set(meal.idMeal, meal);
      }
    });

    const uniqueMeals = Array.from(uniqueMealsMap.values());

    console.log(`Successfully fetched ${uniqueMeals.length} unique recipes.`);
    return uniqueMeals;

  } catch (error) {
    console.error("Failed to fetch all recipes:", error);
    return [];
  }
}
