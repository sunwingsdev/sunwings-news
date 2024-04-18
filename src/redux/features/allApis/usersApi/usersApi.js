import baseApi from "../../baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["users"],
    }),

    getUserByUid: builder.query({
      query: (uid) => `/users/${uid}`,
      providesTags: ["users"],
    }),

    addNewUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    deleteSingleUser: builder.mutation({
      query: (uid) => ({ url: `/users/${uid}`, method: "DELETE" }),
      invalidatesTags: ["users"],
    }),

    addRoleToUser: builder.mutation({
      query: ({ uid, role }) => ({
        url: `/users/role?uid=${uid}&&role=${role}`,
        method: "PUT",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByUidQuery,
  useAddNewUserMutation,
  useDeleteSingleUserMutation,
  useAddRoleToUserMutation,
} = usersApi;
