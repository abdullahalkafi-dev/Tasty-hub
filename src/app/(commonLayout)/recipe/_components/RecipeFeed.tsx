/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import RecipeCard from "@/components/common/RecipeCard";
import SideSection from "@/components/common/sideSection/SideSection";

import { TRecipe } from "@/types/recipe.types";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function RecipeFeed() {
  const [items, setItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [recipe, setRecipe] = useState<TRecipe[]>([]);

  const fetchItems = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/recipe/?limit=2&page=${page}`
    );
    const newItems = await response.json();
    console.log(process.env.NEXT_PUBLIC_BASE_URL);
    console.log(newItems);

    // Check if there's new data
    if (newItems?.data.length > 0) {
      setItems((prevItems: any) => [...prevItems, ...newItems.data]);
      setRecipe((prevRecipe: TRecipe[]) => [...prevRecipe, ...newItems.data]);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  };

  const loadMore = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Initial fetch
  useEffect(() => {
    fetchItems();
  }, [page]);

  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-2 justify-between relative gap-20">
      <main className=" me-auto max-w-[500px] mx-auto py-6 w-full  pt-20  border">
        <div className="sticky top-20 z-50"></div>
        <div className="grid grid-cols-1 gap-4">
          <InfiniteScroll
            dataLength={items.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more items</p>}
          >
            <div className="grid grid-cols-1 gap-4">
              {recipe.map((post: TRecipe) => (
                <RecipeCard key={post._id} recipe={post} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </main>
      <div className="w-full  md:w-[60%] xl:w-full mx-auto">
        <SideSection />
      </div>
    </div>
  );
}
