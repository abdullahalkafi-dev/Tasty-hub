"use client";
import RecipeCard from "@/components/common/RecipeCard";
import { useGetAllRecipeQuery } from "@/redux/api/features/recipe/recipeApi";
import { TRecipe } from "@/types/recipe.types";

const RecipeDetailsSidebar = () => {
const {data,isLoading}= useGetAllRecipeQuery(undefined)
const recipes = data?.data
if(isLoading) return <div>Loading...</div>
  
  return (
    <div className="grid pb-5 grid-cols-2 lg:grid-cols-1  gap-5">
      {recipes?.map((recipe: TRecipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeDetailsSidebar;
