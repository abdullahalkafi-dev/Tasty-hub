import dynamic from "next/dynamic";

const RecipeManagement = dynamic(
    () =>
      import(
        "@/app/(dashboardLayout)/dashboard/recipe-management/_components/singleUserRecipe"
      )
  );

const MyRecipePage = () => {
  return (
   <RecipeManagement/>
  );
};

export default MyRecipePage;