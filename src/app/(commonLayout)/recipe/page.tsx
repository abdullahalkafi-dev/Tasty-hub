import BreadcrumbComponent from "@/components/common/BreadcrumbComponent";
import RecipeFeed from "./_components/RecipeFeed";

const RecipePage = () => {
  const breadcrumbLinks = {
    preLinks: [{ link: "/", name: "Home" }],
    pageName: "Recipe",
  };
  return (
    <div>
      <BreadcrumbComponent links={breadcrumbLinks} />
      <div>
        <RecipeFeed />
      </div>
    </div>
  );
};

export default RecipePage;
