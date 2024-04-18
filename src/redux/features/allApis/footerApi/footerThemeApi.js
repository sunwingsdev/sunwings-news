import baseApi from "../../baseApi";

const footerThemeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateFooterTheme: builder.mutation({
      query: ({ id, data }) => ({
        url: `/footer-theme/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["footer"],
    }),
  }),
});
export const { useUpdateFooterThemeMutation } = footerThemeApi;
