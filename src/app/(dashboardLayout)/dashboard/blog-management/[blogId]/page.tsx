import dynamic from "next/dynamic";

const UpdateBlogPage = async({params}:{params:Record<string,unknown>}) => {

const res=await fetch(`${process.env.NEXT_BASE_URL}/blog/${params.blogId}`,{
    cache: "no-cache",
    
})
const {data}=await res.json()
console.log(data);
    const BlogFormComponent = dynamic(
        () =>
          import(
            "@/app/(dashboardLayout)/dashboard/add-blog/_components/BlogFormComponent"
          ),
        { ssr: false }
      );
    


  return (
    <div>
    <BlogFormComponent blog={data} />
    </div>
  );
};

export default UpdateBlogPage;