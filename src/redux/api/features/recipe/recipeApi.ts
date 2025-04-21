import { baseApi } from "../../baseApi";

const recipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecipe: builder.query({
      query: () => ({
        url: `/recipe`,
        method: "GET",
      }),
      providesTags: ["Recipe"],
    }),
    getSingleRecipe: builder.query({
      query: (id) => ({
        url: `/recipe/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "SingleRecipe", id }],
    }),
    togglePublishStatus: builder.mutation({
      query: (id) => ({
        url: `/recipe/toggle-status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Recipe"],
    }),
    getRecipeForUser: builder.query({
      query: (id) => ({
        url: `/recipe/user/${id}`,
        method: "GET",
      }),
    }),
    getRecipeComment: builder.query({
      query: (id) => ({
        url: `/comment/${id}`,
        method: "GET",
      }),
      providesTags: ["Comment"],
    }),
    createRecipe: builder.mutation({
      query: (body) => ({
        url: `/recipe/create-recipe`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Recipe"],
    }),
    createComment: builder.mutation({
      query: (body) => ({
        url: `/comment`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comment", "SingleRecipe"],
    }),
    deleteRecipe: builder.mutation({
      query: (id: string) => ({
        url: `/recipe/${id}`,
        method: "DELETE",
      }),
      // Here, we need to use the `id` correctly
      invalidatesTags: (result, error, id) => [
        "Recipe",
        { type: "SingleRecipe", id },
      ],
    }),
    updateRecipe: builder.mutation({
      query: ({ body, id }) => {
        console.log(body);
        return {
          url: `/recipe/${id}`,
          method: "PATCH",
          body,
        };
      },
      // Make sure `id` is destructured correctly here
      invalidatesTags: (result, error, { id }) => [
        "Recipe",
        { type: "SingleRecipe", id },
      ],
    }),
    addLike: builder.mutation({
      query: (id) => ({
        url: `/recipe/like/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["SingleRecipe", "Recipe"],
    }),
    addDislike: builder.mutation({
      query: (id) => ({
        url: `/recipe/dislike/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["SingleRecipe", "Recipe"],
    })
  }),
});

export const {
  useGetAllRecipeQuery,
  useCreateRecipeMutation,
  useDeleteRecipeMutation,
  useGetSingleRecipeQuery,
  useUpdateRecipeMutation,
  useGetRecipeForUserQuery,
  useTogglePublishStatusMutation,
  useGetRecipeCommentQuery,
  useCreateCommentMutation,
  useAddLikeMutation,
  useAddDislikeMutation,
} = recipeApi;
