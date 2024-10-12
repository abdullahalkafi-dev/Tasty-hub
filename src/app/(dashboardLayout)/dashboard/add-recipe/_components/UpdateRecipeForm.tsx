"use client";
import { useGetSingleRecipeQuery } from "@/redux/api/features/recipe/recipeApi";
import RecipeFormComponent from "./RecipeFormComponent";
import LoadingAnimation from "@/app/loading";

const RecipeFromDataComponent = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetSingleRecipeQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  if (isLoading) {
    return <LoadingAnimation />;
  }
  const recipe = data?.data;

  return <RecipeFormComponent recipe={recipe} />;
};

export default RecipeFromDataComponent;
