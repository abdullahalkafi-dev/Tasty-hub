import { baseApi } from "../../baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlog: builder.query({
      query: () => {
        return {
          url: `/blog`,
          method: "GET",
        };
      },
      providesTags: ["Blog"],
    }),
    getSingleBlog: builder.query({
      query: (id) => {
        return {
          url: `/blog/${id}`,
          method: "GET",
        };
      },
    }),

    getBlogForUser: builder.query({
      query: (id) => {
        return {
          url: `/blog/user/${id}`,
          method: "GET",
        };
      },
    }),
    createBlog: builder.mutation({
      query: (body) => {
        return {
          url: `/blog`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Blog"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => {
        return {
          url: `/blog/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation({
      query: ({ body, id }) => {
        console.log(id);
        console.log(body); 
        return {
          url: `/blog/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Blog"],
    }),
  }),
});
export const {
useCreateBlogMutation,
useDeleteBlogMutation,
useGetAllBlogQuery,
useGetBlogForUserQuery,
useGetSingleBlogQuery,
useUpdateBlogMutation,

} = blogApi;
