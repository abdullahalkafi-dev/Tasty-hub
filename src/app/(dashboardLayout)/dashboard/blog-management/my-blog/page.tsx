import dynamic from "next/dynamic";

const BlogManagement = dynamic(
    () =>
      import(
        "@/app/(dashboardLayout)/dashboard/blog-management/_components/singleUserBlog"
      )
  );

const MyRecipePage = () => {
  return (
   <BlogManagement/>
  );
};

export default MyRecipePage;