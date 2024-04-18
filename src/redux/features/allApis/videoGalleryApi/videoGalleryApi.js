import baseApi from "../../baseApi";

const videoGalleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVideo: builder.query({
      query: () => "/video-gallery",
      providesTags: ["videoGallery"],
    }),
    uploadAVideo: builder.mutation({
      query: (data) => ({
        url: "/video-gallery",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["videoGallery"],
    }),
    updateVideoSelection: builder.mutation({
      query: ({ id, isSelected }) => ({
        url: `/video-gallery/${id}`,
        method: "PATCH",
        body: { isSelected },
      }),
      invalidatesTags: ["videoGallery"],
    }),
    deleteVideo: builder.mutation({
      query: ({ id }) => ({
        url: `/video-gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["videoGallery"],
    }),
  }),
});

export const {
  useGetAllVideoQuery,
  useUploadAVideoMutation,
  useUpdateVideoSelectionMutation,
  useDeleteVideoMutation,
} = videoGalleryApi;
