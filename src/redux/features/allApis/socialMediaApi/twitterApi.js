import baseApi from "../../baseApi";

const twitterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTwitter: builder.query({
      query: () => "/twitter",
      providesTags: ["twitter"],
    }),
    updateTwitter: builder.mutation({
      query: ({ id, data }) => ({
        url: `/twitter/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["twitter"],
    }),
  }),
});

export const { useGetAllTwitterQuery, useUpdateTwitterMutation } = twitterApi;
