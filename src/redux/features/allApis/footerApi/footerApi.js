import baseApi from "../../baseApi";

const footerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFooter: builder.query({
      query: () => "/footer",
      providesTags: ["footer"],
    }),

    updateFooter: builder.mutation({
      query: ({ id, data }) => ({
        url: `/footer/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["footer"],
    }),
  }),
});
export const { useGetFooterQuery, useUpdateFooterMutation } = footerApi;
