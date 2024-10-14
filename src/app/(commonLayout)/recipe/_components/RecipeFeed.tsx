/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import RecipeCard from "@/components/common/RecipeCard";
import SideSection from "@/components/common/sideSection/SideSection";

import { TRecipe } from "@/types/recipe.types";

import { useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import debounce from "lodash.debounce";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCategoryQuery } from "@/redux/api/features/category/categoryApi";
import { useAppSelector } from "@/lib/hooks";
import { getAccessToken, getRefreshToken } from "@/components/common/utils/token";

export default function RecipeFeed() {
  const [items, setItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [recipe, setRecipe] = useState<TRecipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: categoryRes } = useGetAllCategoryQuery("");
const user = useAppSelector((state) => state.auth.user);
  const fetchItems = async (searchTerm: string, category: string | null) => {
    if (loading) return; // Prevent fetching while loading

    setLoading(true); // Start loading

    try {
      const categoryQuery = category ? `&foodCategory=${category}` : "";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/recipe/?limit=2&page=${page}&searchTerm=${searchTerm}${categoryQuery}`,
        {
          cache: "no-store", // No caching to ensure fresh data
          credentials: "include", // Include credentials in the request
          headers: (() => {
        const headers = new Headers();
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();

        // Set the Authorization header if the access token exists
        if (accessToken) {
          headers.set("Authorization", `Bearer ${accessToken}`);
        }

        // Optionally, set the refresh token in a custom header if needed
        if (refreshToken) {
          headers.set("x-refresh-token", refreshToken);
        }

        return headers;
          })(),
        }
      );
      const newItems = await response.json();

      // Check if there's new data
      if (newItems?.data.length > 0) {
        setItems((prevItems: any) => [...prevItems, ...newItems.data]);
        setRecipe((prevRecipe: TRecipe[]) => [...prevRecipe, ...newItems.data]);
        setHasMore(true);
      } else {
        setHasMore(false); // No more items to fetch
      }
    } catch (error) {
      console.error("Error fetching items: ", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const loadMore = async () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1); // Increment the page to load more items
    }
  };

  // Debounced search function
  const debouncedFetchItems = useCallback(
    debounce((searchTerm: string, category: string | null) => {
      setPage(1); // Reset page to 1 for new search
      setItems([]); // Clear previous items
      setRecipe([]); // Clear previous recipes
      fetchItems(searchTerm, category);
    }, 500),
    []
  );

  const categoryNames =
    categoryRes && categoryRes.data
      ? categoryRes.data.map((foodCategory: any) => ({
          label: foodCategory.name,
          value: foodCategory._id,
        }))
      : [];

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedFetchItems(value, selectedCategory);
  };

  // Handle category selection change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    debouncedFetchItems(searchTerm, value);
  };

  // Initial fetch or page update
  useEffect(() => {
    if (!loading) {
      fetchItems(searchTerm, selectedCategory);
    }
  }, [page]); // Fetch new data when the page changes

  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-2 justify-between relative gap-20">
      
      <main className="me-auto max-w-[500px] mx-auto py-6 w-full pt-20">
        {user?.isPremium || <div> 
        
         <p className="text-sm pb-4 font-semibold text-red-500"> Only premium users can view premium content</p>
           </div>}
        <div className="flex w-full gap-4 pb-3 justify-center">
          <div>
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 border rounded-full border-gray-300 "
            />
          </div>
          <div>
            <div className="mt-1 w-full">
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full  rounded-full">
                  <SelectValue placeholder="Select food category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryNames.map((category: any) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <p className="text-2xl font-bold text-center underline pb-10">
          All recipes
        </p>
        <div className="grid grid-cols-1 gap-4">
          <InfiniteScroll
            dataLength={items.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <p className="text-center font-bold pt-10 text-2xl">Loading...</p>
            }
            endMessage={
              <p className="text-center font-bold pt-10 text-2xl">
                No more items
              </p>
            }
          >
            <div className="grid grid-cols-1 gap-4">
              {recipe.map((post: TRecipe) => (
                <RecipeCard key={post._id} recipe={post} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </main>
      <div className="w-full md:w-[60%] xl:w-full mx-auto">
        <SideSection />
      </div>
    </div>
  );
}
