import dynamic from "next/dynamic";

const AddRecipePage = () => {
  const RecipeFormComponent = dynamic(
    () =>
      import(
        "@/app/(dashboardLayout)/dashboard/add-recipe/_components/RecipeFormComponent"
      ),
    { ssr: false }
  );

  return (
    <div className="">
      <RecipeFormComponent />{" "}
    </div>
  );
};

export default AddRecipePage;
