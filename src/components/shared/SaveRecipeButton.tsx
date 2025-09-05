"use client";


import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { toggleSaveRecipe } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface SaveRecipeButtonProps {
  recipeId: string;
  isInitiallySaved: boolean;
}


export default function SaveRecipeButton({ recipeId, isInitiallySaved }: SaveRecipeButtonProps) {
  const { userId } = useAuth();
  const router = useRouter();
  const [ isSaved, setIsSaved ] = useState(isInitiallySaved);
  const [ isPending, startTransition ] = useTransition();

  const handleSaveToggle = () => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }

    startTransition(async () => {
      try {
        // Optimistic update
        setIsSaved(prevState => !prevState);

        const result = await toggleSaveRecipe(recipeId);
        toast.success(result.message);
      } catch (error) {
        // Revert on error
        setIsSaved(prevState => !prevState);
        toast.error("Something went wrong. Please try again.");
      }
    });
  }

  return (
    <Button onClick={ handleSaveToggle } disabled={ isPending }>
      <Bookmark
        className={ `h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}` }
      />
      {
        isPending
          ? "Saving..."
          : (isSaved ? "Unsave Recipe" : "Save Recipe")
      }
    </Button>
  )
}
