import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    addAdmin: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/add-admin",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),
    toggleUserStatus: builder.mutation({
      query: (id) => ({
        url: `/users/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    promoteToAdmin: builder.mutation({
      query: (id) => ({
        url: `/users/promote-admin/${id}`,
        method: "PATCH",
      }),

      invalidatesTags: ["User"],
    }),
    updateUserInfo: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User" },
        { type: "SingleUser", id },
      ],
    }),
    getLoginUserInfo: builder.query({
      query: (mongodbId) => ({
        url: `/users/${mongodbId}`,
        method: "GET",
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "SingleUser", id }],
    }),
    followUser: builder.mutation({
      query: ({ id, targetUserId }) => ({
        url: `/users/follow`,
        method: "PATCH",
        body: { userId: id, targetUserId },
      }),
      invalidatesTags: (result, error, id) => [{ type: "SingleUser", id }],
    }),
    unFollowUser: builder.mutation({
      query: ({ id, targetUserId }) => ({
        url: `/users/unfollow`,
        method: "PATCH",
        body: { userId: id, targetUserId },
      }),
      invalidatesTags: (result, error, { targetUserId }) => [
        { type: "SingleUser", id: targetUserId }, // Invalidate the SingleUser tag for the unfollowed user
      ],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useAddAdminMutation,
  useGetLoginUserInfoQuery,
  useGetAllUsersQuery,
  usePromoteToAdminMutation,
  useToggleUserStatusMutation,
  useGetSingleUserQuery,
  useUpdateUserInfoMutation,
  useFollowUserMutation,
  useUnFollowUserMutation,
} = authApi;
