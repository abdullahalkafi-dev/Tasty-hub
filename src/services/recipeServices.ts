import {
  getAccessToken,
  getRefreshToken,
} from "@/components/common/utils/token";

export const getRecipe = async (limit: string = "10000") => {
  const accessToken = getAccessToken(); // Replace with actual access token retrieval logic
  console.log(accessToken);
  const refreshToken = getRefreshToken(); // Replace with actual refresh token retrieval logic

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  // Set the Authorization header if the access token exists
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  // Optionally, set the refresh token in a custom header if needed
  if (refreshToken) {
    headers.set("x-refresh-token", refreshToken);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/recipe?limit=${limit}`,
    {
      method: "GET",
      headers: headers,
      cache: "no-cache",
      credentials: "include",
    }
  
  );

  const result = await res.json();
  return result;
};
