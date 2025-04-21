import BreadcrumbComponent from "@/components/common/BreadcrumbComponent";
import RecipeFeed from "./_components/RecipeFeed";

const RecipePage = () => {
  const breadcrumbLinks = {
    preLinks: [{ link: "/", name: "Home" }],
    pageName: "Recipe",
  };
  return (
    <div className="max-w-[1440px] mx-auto px-2">
      <BreadcrumbComponent links={breadcrumbLinks} />
    <div>

<RecipeFeed/>

    </div>
    </div>
  );
};

export default RecipePage;
