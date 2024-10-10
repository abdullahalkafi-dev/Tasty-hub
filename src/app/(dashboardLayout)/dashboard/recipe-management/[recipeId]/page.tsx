import dynamic from "next/dynamic";

const RecipeFormComponent = dynamic(
  () =>
    import(
      "@/app/(dashboardLayout)/dashboard/add-recipe/_components/UpdateRecipeForm"
    ),
  { ssr: false }
);

const RecipePage = async ({ params }: { params: Record<string, string> }) => {
 

  return <RecipeFormComponent id={params.recipeId} />;
};

export default RecipePage;
