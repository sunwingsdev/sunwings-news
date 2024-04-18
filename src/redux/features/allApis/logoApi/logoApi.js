import baseApi from "../../baseApi";

const logoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLogo: builder.query({
      query: () => "/logos",
      providesTags: ["logos"],
    }),
    uploadALogo: builder.mutation({
      query: (data) => ({
        url: "/logos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["logos"],
    }),
    updateLogoSelection: builder.mutation({
      query: ({ id, isSelected }) => ({
        url: `/logos/${id}`,
        method: "PATCH",
        body: { isSelected },
      }),
      invalidatesTags: ["logos"],
    }),
    deleteALogo: builder.mutation({
      query: ({ id }) => ({
        url: `/logos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["logos"],
    }),
  }),
});

export const {
  useGetAllLogoQuery,
  useUploadALogoMutation,
  useUpdateLogoSelectionMutation,
  useDeleteALogoMutation,
} = logoApi;
