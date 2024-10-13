import BreadcrumbComponent from "@/components/common/BreadcrumbComponent";
import BlogFeed from "./_components/BlogFeed";


const RecipePage = () => {
  const breadcrumbLinks = {
    preLinks: [{ link: "/", name: "Home" }],
    pageName: "Blog",
  };
  return (
    <div>
      <BreadcrumbComponent links={breadcrumbLinks} />
    <div>

<BlogFeed/>

    </div>
    </div>
  );
};

export default RecipePage;
