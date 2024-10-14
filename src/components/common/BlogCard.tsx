import { TBlog } from "@/types/blog.types";
import { Clock10 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NewsCard({ blog }: { blog: TBlog }) {
  return (
    <div className="rounded overflow-hidden shadow-lg flex flex-col">
      <Link href={`/blog/${blog._id}`}>
        <div className="relative">
          <Image
            className="w-full max-h-[300px] object-cover"
            src={blog.image}
            alt="Sunset in the mountains"
            layout="responsive"
            width={500}
            height={333}
            
          />
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25" />
        </div>
      </Link>
      <div className="px-6 py-4 mb-auto">
        <Link href={`/blog/${blog._id}`}>
          <div className="  inline-block font-medium text-sm transition  mb-2">
            {blog.blogCategory}
          </div>
        </Link>
        <Link href={`/blog/${blog._id}`}>
          <p className=" text-lg font-medium duration-500 ease-in-out hover:text-indigo-600 ">
            {blog.title}.
          </p>
        </Link>
      </div>
      <div className="px-2 xl:px-6 py-3 flex flex-row items-center justify-between bg-[#fff0ed]">
        <span className="py-1 gap-1 font-regular text-gray-900 mr-1 flex flex-row items-center">
          <div>
            <Image
              src={blog.user.image}
              className="w-[40px] h-[40px] rounded-full"
              width={70}
              height={70}
              alt="User profile"
            />
          </div>
          <span className="ml-1 font-medium">{blog.user.name}</span>
        </span>
        <span className="py-1 gap-1 font-regular text-gray mr-1 flex flex-row items-center">
          <Clock10 color="gray" size={21} strokeWidth={2.4} />
          <span className="ml-1">
            {new Date(blog.createdAt).toDateString()}
          </span>
        </span>
      </div>
    </div>
  );
}
