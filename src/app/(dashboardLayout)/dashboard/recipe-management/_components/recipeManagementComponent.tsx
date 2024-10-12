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
  useDeleteRecipeMutation,
  useGetAllRecipeQuery,
  useTogglePublishStatusMutation,
} from "@/redux/api/features/recipe/recipeApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingAnimation from "@/app/loading";

interface RecipeData {
  _id: string;
  user: {
    name: string;
    image: string;
  };
  name: string;
  foodCategory: {
    name: string;
  };
  isVegetarian: boolean;
  totalPeople: number;
  readyIn: number;
  isPremium: boolean;
  totalAverageRating: number;
  recipeImage: string;
  isPublished: boolean;
}

const RecipeTable = () => {
  const { data, isLoading, error } = useGetAllRecipeQuery(undefined); // Check loading statec
  const recipeData = data?.data;
  const [deleteRecipeMutation] = useDeleteRecipeMutation();
  const [toggleRecipeStatus] = useTogglePublishStatusMutation();
  const router = useRouter();
 
  // Define columns for the table
  const columns = useMemo<ColumnDef<RecipeData>[]>(
    () => [
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
        header: "Recipe Name",
        accessorKey: "name",
      },
      {
        header: "Food Category",
        accessorKey: "foodCategory",
        cell: ({ row }) => row.original.foodCategory.name,
      },
      {
        header: "Vegetarian",
        accessorKey: "isVegetarian",
        cell: ({ row }) => (row.original.isVegetarian ? "Yes" : "No"),
      },
      {
        header: "Total People",
        accessorKey: "totalPeople",
      },
      {
        header: "Ready In (mins)",
        accessorKey: "readyIn",
      },
      {
        header: "Rating",
        accessorKey: "totalAverageRating",
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-1" >
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleRecipeStatus(row.original._id)}
            >
              {row.original.isPublished ? "UnPublish" : "Publish"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/recipe/${row.original._id}`)}
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
                    your account and remove your data from our servers.
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
    ],
    []
  );

  // Table instance
  const table = useReactTable({
    data: recipeData || [], // Default to empty array if data is undefined
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleUpdate = (id: string) => {
    router.push(`/dashboard/recipe-management/${id}`);

    // Add your update logic here
  };

  const handleDelete = async (id: string) => {
    const res = await deleteRecipeMutation(id);

    if (res.error) {
      console.log(res.error);
    }
    if (res.data?.success) {
      toast("Recipe deleted successfully");
    }
  };

  if (isLoading) {
    return <LoadingAnimation/>; // Show loading message while fetching data
  }

  if (error) {
    return <div>Error loading recipes.</div>; // Show error message if fetching fails
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

export default RecipeTable;
