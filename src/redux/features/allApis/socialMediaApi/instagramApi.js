import baseApi from "../../baseApi";

const instagramApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllInstagram: builder.query({
      query: () => "/instagram",
      providesTags: ["instagram"],
    }),
    updateInstagram: builder.mutation({
      query: ({ id, data }) => ({
        url: `/instagram/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["instagram"],
    }),
  }),
});

export const { useGetAllInstagramQuery, useUpdateInstagramMutation } =
  instagramApi;
