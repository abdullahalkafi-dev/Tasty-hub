import dynamic from "next/dynamic";

const RecipeManagement = dynamic(
    () =>
      import(
        "@/app/(dashboardLayout)/dashboard/blog-management/_components/singleUserBlog"
      )
  );

const MyRecipePage = () => {
  return (
   <RecipeManagement/>
  );
};

export default MyRecipePage;