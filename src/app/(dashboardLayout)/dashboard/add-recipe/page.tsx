import dynamic from "next/dynamic";





const AddRecipePage = () => {
  const AddRecipeComponent = dynamic(() => import("@/app/(dashboardLayout)/dashboard/add-recipe/_components/AddRecipeComponent"), { ssr: false });
  
  return (
    <div className="">
      <AddRecipeComponent/>
    </div>
  );
};

export default AddRecipePage;
