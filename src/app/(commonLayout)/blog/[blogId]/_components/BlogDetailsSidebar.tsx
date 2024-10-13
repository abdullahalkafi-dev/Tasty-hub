"use clint";


import BlogCard from '@/components/common/BlogCard';
import { TBlog } from '@/types/blog.types';

const BlogDetailsSidebar = ({ blogs }: { blogs: TBlog[] }) => {
  return (
    <div className="grid pb-5 grid-cols-2 lg:grid-cols-1  gap-5">
      {blogs?.map((blog: TBlog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogDetailsSidebar;
