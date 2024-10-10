import dynamic from "next/dynamic";

const AddBlogPage = () => {
  const BlogFormComponent = dynamic(
    () =>
      import(
        "@/app/(dashboardLayout)/dashboard/add-blog/_components/BlogFormComponent"
      ),
    { ssr: false }
  );

  return (
    <div className="">
      <BlogFormComponent />{" "}
    </div>
  );
};

export default AddBlogPage;
