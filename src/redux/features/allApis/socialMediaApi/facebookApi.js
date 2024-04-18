import baseApi from "../../baseApi";

const facebookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacebook: builder.query({
      query: () => "/facebook",
      providesTags: ["facebook"],
    }),
    updateFacebook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/facebook/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["facebook"],
    }),
  }),
});

export const { useGetAllFacebookQuery, useUpdateFacebookMutation } =
  facebookApi;
