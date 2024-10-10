"use client";
import { useGetSingleRecipeQuery } from "@/redux/api/features/recipe/recipeApi";
import RecipeFormComponent from "./RecipeFormComponent";

const RecipeFromDataComponent = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetSingleRecipeQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const recipe = data?.data;

  return <RecipeFormComponent recipe={recipe} />;
};

export default RecipeFromDataComponent;
