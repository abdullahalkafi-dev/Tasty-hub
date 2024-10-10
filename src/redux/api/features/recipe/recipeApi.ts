import { baseApi } from "../../baseApi";

const recipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecipe: builder.query({
      query: () => {
        return {
          url: `/recipe`,
          method: "GET",
        };
      },
      providesTags: ["Recipe"],
    }),
    getSingleRecipe: builder.query({
      query: (id) => {
        return {
          url: `/recipe/${id}`,
          method: "GET",
        };
      },
    }),
    togglePublishStatus: builder.mutation({
      query: (id) => {
        return {
          url: `/recipe/toggle-status/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["Recipe"],
    }),
    getRecipeForUser: builder.query({
      query: (id) => {
        return {
          url: `/recipe/user/${id}`,
          method: "GET",
        };
      },
    }),
    createRecipe: builder.mutation({
      query: (body) => {
        return {
          url: `/recipe/create-recipe`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Recipe"],
    }),
    deleteRecipe: builder.mutation({
      query: (id) => {
        return {
          url: `/recipe/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Recipe"],
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
      invalidatesTags: ["Recipe"],
    }),
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
} = recipeApi;
