"use server";


import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";


export async function toggleSaveRecipe(recipeId: string) {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      message: "You must be signed in to save recipes."
    };
  }

  try {
    const existingSavedRecipe = await prisma.savedRecipe.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });

    if (existingSavedRecipe) {
      await prisma.savedRecipe.delete({
        where: {
          id: existingSavedRecipe.id,
        },
      });
      revalidatePath(`/recipe/${recipeId}`);
      revalidatePath(`/saved`);
      return {
        success: true,
        message: "Recipe unsaved successfully."
      };
    } else {
      await prisma.savedRecipe.create({
        data: {
          userId,
          recipeId,
        },
      });
      revalidatePath(`/recipe/${recipeId}`);
      revalidatePath(`/saved`);
      return {
        success: true,
        message: "Recipe saved successfully."
      };
    }

  } catch (error) {
    console.error("Database Error:", error);
    return {
      success: false,
      message: "Failed to update saved status."
    };
  }
}
