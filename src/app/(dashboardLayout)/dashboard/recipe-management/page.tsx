import dynamic from "next/dynamic";

const Page = () => {
  // const RecipeManagement = dynamic(
  //   () =>
  //     import(
  //       "@/app/(dashboardLayout)/dashboard/recipe-management/_components/recipeManagementComponent"
  //     )
  // );
  const RecipeManagement = dynamic(
    () =>
      import(
        "@/app/(dashboardLayout)/dashboard/recipe-management/_components/recipeManagementComponent"
      )
  );

  return <RecipeManagement />;
};

export default Page;
