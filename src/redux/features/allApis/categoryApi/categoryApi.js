import baseApi from "../../baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories",
      providesTags: ["category"],
    }),
    addNewCategory: builder.mutation({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    deleteSingleCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddNewCategoryMutation,
  useDeleteSingleCategoryMutation,
} = categoryApi;
