/* eslint-disable @typescript-eslint/no-explicit-any */
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
  useGetAllUsersQuery,
  usePromoteToAdminMutation,
  useToggleUserStatusMutation,
} from "@/redux/api/features/auth/authApi";
import LoadingAnimation from "@/app/loading";

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  followers: any[];
  recipePublished: any[];
  isPremium: boolean;
  isBlocked: boolean;
}

const UserTable = () => {
  const { data, isLoading, error } = useGetAllUsersQuery(undefined); // Check loading state
  const userData = data?.data;
  const [toggleUserStatus] = useToggleUserStatusMutation();
  const [promoteToAdmin] = usePromoteToAdminMutation();
  
  const columns = useMemo<ColumnDef<UserData>[]>(
    () => [
      {
        header: "User",
        accessorKey: "name",
        cell: ({ row }) => (
          <div className="flex items-center">
            <Image
              width={400}
              height={400}
              src={row.original.image}
              alt={row.original.name}
              className="h-8 w-8 rounded-full mr-2"
            />
            <span>{row.original.name}</span>
          </div>
        ),
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Role",
        accessorKey: "role",
      },
      {
        header: "Followers",
        accessorKey: "followers",
        cell: ({ row }) => row.original.followers.length,
      },
      {
        header: "Recipes Published",
        accessorKey: "recipePublished",
        cell: ({ row }) => row.original.recipePublished.length,
      },
      {
        header: "Premium",
        accessorKey: "isPremium",
        cell: ({ row }) => (row.original.isPremium ? "Yes" : "No"),
      },
      {
        header: "Blocked",
        accessorKey: "isBlocked",
        cell: ({ row }) => (row.original.isBlocked ? "Yes" : "No"),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            {row.original.role === "admin" || (
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant="outline" size="sm">
                    Promote to Admin
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This user will have full access to the platform.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => promoteToAdmin(row.original._id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {row.original.role === "admin" || (
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    disabled={row.original.role === "admin"}
                    variant="destructive"
                    size="sm"
                  >
                    {row.original.isBlocked ? "Unblock" : "Block"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                     {
                      row.original.isBlocked ? "This user will be unblocked." : "This user will be blocked."
                     }
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => toggleUserStatus(row.original._id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        ),
      },
    ],
    []
  );

  // Table instance
  const table = useReactTable({
    data: userData || [], // Default to empty array if data is undefined
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <LoadingAnimation/>; // Show loading message while fetching data
  }

  if (error) {
    return <div>Error loading users.</div>; // Show error message if fetching fails
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

export default UserTable;
