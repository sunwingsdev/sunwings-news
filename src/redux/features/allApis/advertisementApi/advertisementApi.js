import baseApi from "../../baseApi";

const advertisementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdvertisement: builder.query({
      query: () => "/advertisements",
      providesTags: ["advertisements"],
    }),
    uploadAnAdvertisement: builder.mutation({
      query: (data) => ({
        url: "/advertisements",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["advertisements"],
    }),
    updateAdSelection: builder.mutation({
      query: ({ id, isSelected }) => ({
        url: `/advertisements/${id}`,
        method: "PATCH",
        body: { isSelected },
      }),
      invalidatesTags: ["advertisements"],
    }),
    updateAdStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/advertisements/status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["advertisements"],
    }),
    deleteAnAd: builder.mutation({
      query: ({ id }) => ({
        url: `/advertisements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["advertisements"],
    }),
  }),
});

export const {
  useGetAllAdvertisementQuery,
  useUploadAnAdvertisementMutation,
  useUpdateAdSelectionMutation,
  useUpdateAdStatusMutation,
  useDeleteAnAdMutation,
} = advertisementApi;
