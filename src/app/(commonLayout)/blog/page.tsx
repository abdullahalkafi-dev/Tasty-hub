import BreadcrumbComponent from "@/components/common/BreadcrumbComponent";
import BlogFeed from "./_components/BlogFeed";


const RecipePage = () => {
  const breadcrumbLinks = {
    preLinks: [{ link: "/", name: "Home" }],
    pageName: "Blog",
  };
  return (
    <div className="max-w-[1440px] mx-auto px-2">
      <BreadcrumbComponent links={breadcrumbLinks} />
    <div>

<BlogFeed/>

    </div>
    </div>
  );
};

export default RecipePage;
