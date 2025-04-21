export const getBlogs = async (limit: string = "10000") => {
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog?limit=${limit}`,{
    cache: "no-cache",
  });

  return await res.json();
};
