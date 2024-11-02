export const getRecipe = async (limit: string = "1000000") => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/recipe?limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      credentials: "include",
    }
  );

  const result = await res.json();
  return result;
};
export const getSingleRecipe = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/recipe/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      credentials: "include",
    }
  );

  const result = await res.json();
  return result;
};
