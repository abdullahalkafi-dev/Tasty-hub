/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SideSection from "@/components/common/sideSection/SideSection";
import { useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BlogCard from "@/components/common/BlogCard";
import { TBlog } from "@/types/blog.types";
import debounce from "lodash.debounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { foodBlogCategories } from "@/constant";
import { useAppSelector } from "@/lib/hooks";

export default function BlogFeed() {
  const [items, setItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [blog, setBlog] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const user = useAppSelector((state) => state.auth.user);
  const fetchItems = async (searchTerm: string, category: string | null) => {
    if (loading) return; // Prevent fetching while loading

    setLoading(true); // Start loading

    try {
      const categoryQuery = category ? `&blogCategory=${category}` : "";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blog/?limit=2&page=${page}&searchTerm=${searchTerm}${categoryQuery}`,
        {
          cache: "no-cache", // No caching to ensure fresh data
        }
      );
      const newItems = await response.json();

      console.log(`Fetching page: ${page}`);
      console.log(newItems);

      // Check if there's new data
      if (newItems?.data.length > 0) {
        setItems((prevItems: any) => [...prevItems, ...newItems.data]);
        setBlog((prevBlog: TBlog[]) => [...prevBlog, ...newItems.data]);
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
      setBlog([]); // Clear previous blogs
      fetchItems(searchTerm, category);
    }, 500),
    []
  );

  const categoryNames = foodBlogCategories.map((foodCategory: any) => ({
    label: foodCategory,
    value: foodCategory,
  }));

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
        {user?.isPremium || (
          <div>
            <p className="text-sm pb-4 font-semibold text-red-500">
              {" "}
              Only premium users can view premium content
            </p>
          </div>
        )}
        <div className="flex w-full gap-4 pb-3 justify-center">
          <div>
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 border rounded-full border-gray-300 "
            />
          </div>
          <div>
            <div className="mt-1 w-full">
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full rounded-full">
                  <SelectValue placeholder="Select category" />
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
          All Blogs
        </p>
        <div className="grid grid-cols-1 gap-4">
          <InfiniteScroll
            dataLength={items.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <p className="text-center font-bold pt-10 text-2xl">
                Loading....
              </p>
            }
            endMessage={
              <p className="text-center font-bold pt-10 text-2xl">
                No more items
              </p>
            }
          >
            <div className="grid grid-cols-1 gap-4">
              {blog.map((post: TBlog) => (
                <BlogCard key={post._id} blog={post} />
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
