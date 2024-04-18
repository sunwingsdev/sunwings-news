import baseApi from "../../baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ category = "", subCategory = "" }) =>
        `/posts?category=${category}&&subCategory=${subCategory}`,
      providesTags: ["posts"],
    }),

    getPostById: builder.query({
      query: ({ id }) => `/posts/${id}`,
      providesTags: ["posts"],
    }),

    addNewPost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["posts"],
    }),

    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["posts"],
    }),

    updatePopular: builder.mutation({
      query: ({ id, data }) => ({
        url: `/posts/popular/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["posts"],
    }),

    updateStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["posts"],
    }),

    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddNewPostMutation,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useUpdatePopularMutation,
  useUpdateStatusMutation,
} = postApi;
