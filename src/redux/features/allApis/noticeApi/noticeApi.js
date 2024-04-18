import baseApi from "../../baseApi";
const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get notice
    getGetNotice: builder.query({
      query: () => "/notice",
      providesTags: ["notice"],
    }),

    // add notice
    addNotice: builder.mutation({
      query: (data) => ({
        url: "/notice",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notice"],
    }),

    // patch is opened value
    addIsOpened: builder.mutation({
      query: (email) => ({
        url: `/notice/isOpened/${email}`,
        method: "PATCH",
      }),
      invalidatesTags: ["notice"],
    }),

    // notice delete by id
    deleteNotice: builder.mutation({
      query: (id) => ({
        url: `/notice/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notice"],
    }),
  }),
});

export const {
  useAddNoticeMutation,
  useGetGetNoticeQuery,
  useAddIsOpenedMutation,
  useDeleteNoticeMutation,
} = noticeApi;
