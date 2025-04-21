
import BreadcrumbComponent from "@/components/common/BreadcrumbComponent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TBlog } from "@/types/blog.types";
import Image from "next/image";
import Link from "next/link";
import BlogDescriptionComponent from "./_components/BlogDescriptionComponent";
import BlogDetailsSidebar from "./_components/BlogDetailsSidebar";
import PremiumIcon from "@/components/common/utils/PremiumIcon";

const BlogDetailsPage = async ({
  params,
}: {
  params: Record<string, string>;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${params.blogId}`,
    {
      cache: "no-cache",
    }
  );
  const data = await res.json();
  const resSideData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/blog?limit=6`,
    {
      cache: "no-cache",
    }
  );
  const sideBarData = await resSideData.json();

  const blog: TBlog = data?.data;

  const breadcrumbLinks = {
    preLinks: [
      { link: "/", name: "Home" },
      { link: "/blog", name: "Blog" },
    ],
    pageName: blog?.title,
  };
  if (!blog)
    return (
      <div className="flex flex-col justify-center h-screen items-center w-full">
        <p className="font-bold text-3xl ">Blog not found</p>
        <Link href={"/blog"}>
          <Button className="mt-5">Go back</Button>
        </Link>
      </div>
    );
  return (
    <div className="max-w-[1440px] mx-auto px-2">
      <div className="px-2">
        <BreadcrumbComponent links={breadcrumbLinks} />

        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Image
              width={40}
              height={40}
              alt="user"
              className="w-[40px] h-[40px] rounded-full"
              src={blog.user.image}
            />
            <p className="text-sm text-gray-500">{blog?.user?.name} </p>
          </div>
        </div>

        <div className="p-2 md:p-1  flex  items-center gap-5 mt-5">
          <h1 className="text-2xl font-bold md:text-2xl  ">{blog?.title}</h1>
          {blog?.isPremium && <PremiumIcon />}
        </div>
        <Separator className="my-2" />
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-[70%] lg:pt-5 px-5  min-h-screen ">
          <div className="w-full">
            <Image
              className="w-full object-center object-cover h-[500px]"
              alt="recipe image"
              src={blog?.image}
              width={500}
              height={400}
            />
          </div>

          <Separator className="my-1" />
          <div className="w-full mt-10 min-h-[30vh] ">
            <BlogDescriptionComponent content={blog?.description} />
          </div>
        </div>
        <div className="lg:w-[30%] min-h-screen lg:pt-5 px-5 ">
          <p className="text-2xl text-center pb-5 font-bold">You may like </p>
          {<BlogDetailsSidebar blogs={sideBarData?.data} />}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
