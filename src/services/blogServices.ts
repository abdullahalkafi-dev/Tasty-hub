export const getBlogs = async (limit: string = "10000") => {
  const res = await fetch(`${process.env.NEXT_BASE_URL}/blog?limit=${limit}`,{
    
  });

  return await res.json();
};
