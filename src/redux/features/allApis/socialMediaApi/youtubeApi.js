import baseApi from "../../baseApi";

const youtubeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllYoutube: builder.query({
      query: () => "/youtube",
      providesTags: ["youtube"],
    }),
    updateYoutube: builder.mutation({
      query: ({ id, data }) => ({
        url: `/youtube/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["youtube"],
    }),
  }),
});

export const { useGetAllYoutubeQuery, useUpdateYoutubeMutation } = youtubeApi;
