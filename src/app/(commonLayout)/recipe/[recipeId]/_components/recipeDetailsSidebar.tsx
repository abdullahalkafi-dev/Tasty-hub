"use clint";
import RecipeCard from "@/components/common/RecipeCard";
import { TRecipe } from "@/types/recipe.types";

const RecipeDetailsSidebar = ({ recipes }: { recipes: TRecipe[] }) => {
  return (
    <div className="grid pb-5 grid-cols-2 lg:grid-cols-1  gap-5">
      {recipes?.map((recipe: TRecipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeDetailsSidebar;
