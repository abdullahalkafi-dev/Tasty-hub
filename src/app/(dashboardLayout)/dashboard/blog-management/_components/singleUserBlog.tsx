"use client";

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  useDeleteBlogMutation,
  useGetAllBlogQuery,
  useGetBlogForUserQuery,
 
} from "@/redux/api/features/blog/blogApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { foodBlogCategories } from "@/constant";
import { z } from "zod";
import { useAppSelector } from "@/lib/hooks";
import { useGetRecipeForUserQuery } from "@/redux/api/features/recipe/recipeApi";
import LoadingAnimation from "@/app/loading";

export const BlogSchema = z.object({
  user: z.string({ required_error: 'User Id is required' }).min(2).max(255),
  blogCategory: z.enum(foodBlogCategories as [string, ...string[]]),
  title: z.string({ required_error: 'Title is required' }),
  description: z.string({ required_error: 'Description is required' }),
  image: z.string({ invalid_type_error: 'Invalid type' }),
  isPremium: z.boolean({ invalid_type_error: 'Invalid type' }).optional(),
});

interface BlogData {
  _id: string;
  user: {
    name: string;
    image: string;
  };
  blogCategory: string;
  title: string;
  description: string;
  image: string;
  isPremium: boolean;
  createdAt: string;
}

const BlogTable = () => {




  const user = useAppSelector((state) => state.auth.user);

  const { data, isLoading, error } = useGetBlogForUserQuery(user?._id);

 



  
  const blogData = data?.data;
  const [deleteBlogMutation] = useDeleteBlogMutation();

  const router = useRouter();

  const columns = useMemo<ColumnDef<BlogData>[]>(() => [
    {
      header: "User",
      accessorKey: "user",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Image
            width={400}
            height={400}
            src={row.original.user.image}
            alt={row.original.user.name}
            className="h-8 w-8 rounded-full mr-2"
          />
          <span>{row.original.user.name}</span>
        </div>
      ),
    },
    {
      header: "Blog Category",
      accessorKey: "blogCategory",
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Premium",
      accessorKey: "isPremium",
    },
    {
      header: "CreatedAt",
      accessorKey: "createdAt",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-1">
        
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/blog/${row.original._id}`)}
          >
            Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleUpdate(row.original._id)}
          >
            Update
          </Button>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="destructive" size="sm" className="">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your blog and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(row.original._id)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ], []);

  const table = useReactTable({
    data: blogData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleUpdate = (id: string) => {
    router.push(`/dashboard/blog-management/${id}`);
  };

  const handleDelete = async (id: string) => {
    const res = await deleteBlogMutation(id);

    if (res.error) {
      console.log(res.error);
    }
    if (res.data?.success) {
      toast("Blog deleted successfully");
    }
  };

  if (isLoading) {
    return <LoadingAnimation/>;
  }

  if (error) {
    return <div>Error loading blogs.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 border-b-2 border-gray-300 text-left"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 border-b border-gray-200"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;
