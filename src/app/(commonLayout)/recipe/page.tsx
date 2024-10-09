import BreadcrumbComponent from "@/components/common/BreadcrumbComponent";

const RecipePage = () => {
  const breadcrumbLinks = {
    preLinks: [{ link: "/", name: "Home" }],
    pageName: "Recipe",
  };
  return (
    <div>
      <BreadcrumbComponent links={breadcrumbLinks} />
      recipe page
    </div>
  );
};

export default RecipePage;
