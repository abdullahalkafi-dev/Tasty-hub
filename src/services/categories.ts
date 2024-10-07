export const getCategories = async (limit: string = "10000") => {
  const res = await fetch(`${process.env.NEXT_BASE_URL}/category?limit=${limit}`);

  return await res.json();
};
