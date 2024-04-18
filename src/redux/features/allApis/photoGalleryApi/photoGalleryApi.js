import baseApi from "../../baseApi";

const photoGalleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPhoto: builder.query({
      query: () => "/photo-gallery",
      providesTags: ["photoGallery"],
    }),
    uploadAPhoto: builder.mutation({
      query: (data) => ({
        url: "/photo-gallery",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["photoGallery"],
    }),
    updatePhotoSelection: builder.mutation({
      query: ({ id, isSelected }) => ({
        url: `/photo-gallery/${id}`,
        method: "PATCH",
        body: { isSelected },
      }),
      invalidatesTags: ["photoGallery"],
    }),
    deletePhoto: builder.mutation({
      query: ({ id }) => ({
        url: `/photo-gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["photoGallery"],
    }),
  }),
});

export const {
  useGetAllPhotoQuery,
  useUploadAPhotoMutation,
  useUpdatePhotoSelectionMutation,
  useDeletePhotoMutation,
} = photoGalleryApi;
