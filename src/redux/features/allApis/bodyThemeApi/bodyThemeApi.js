import baseApi from "../../baseApi";

const bodyThemeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBodyTheme: builder.query({
      query: () => "/body-theme",
      providesTags: ["bodyTheme"],
    }),
    updateBodyBg: builder.mutation({
      query: ({ id, bodyBg }) => ({
        url: `/body-theme/${id}`,
        method: "PUT",
        body: { bodyBg },
      }),
      invalidatesTags: ["bodyTheme"],
    }),
    updateSinglePostBg: builder.mutation({
      query: ({ id, singlePostBg }) => ({
        url: `/body-theme/${id}`,
        method: "PUT",
        body: { singlePostBg },
      }),
      invalidatesTags: ["bodyTheme"],
    }),
    updateNewsCard: builder.mutation({
      query: ({
        id,
        newsCardBg,
        isNewsCardBorderd,
        newsCardBorderWidth,
        newsCardBorderStyle,
        newsCardBorderColor,
        newscardTitleFontSize,
        newscardTitleFontColor,
      }) => ({
        url: `/body-theme/${id}`,
        method: "PUT",
        body: {
          newsCardBg,
          isNewsCardBorderd,
          newsCardBorderWidth,
          newsCardBorderStyle,
          newsCardBorderColor,
          newscardTitleFontSize,
          newscardTitleFontColor,
        },
      }),
      invalidatesTags: ["bodyTheme"],
    }),
    updateSinglePostTitle: builder.mutation({
      query: ({ id, singlePostTitleFontColor, singlePostTitleFontSize }) => ({
        url: `/body-theme/${id}`,
        method: "PUT",
        body: { singlePostTitleFontColor, singlePostTitleFontSize },
      }),
      invalidatesTags: ["bodyTheme"],
    }),
    updateMarque: builder.mutation({
      query: ({ id, marqueTitleFontSize, marqueTitleFontColor, marqueBg }) => ({
        url: `/body-theme/${id}`,
        method: "PUT",
        body: { marqueTitleFontSize, marqueTitleFontColor, marqueBg },
      }),
      invalidatesTags: ["bodyTheme"],
    }),
    updateSinglePostAuthor: builder.mutation({
      query: ({
        id,
        singlePostAuthorFontColor,
        singlePostAuthorFontSize,
        singlePostAuthorImageSize,
      }) => ({
        url: `/body-theme/${id}`,
        method: "PUT",
        body: {
          singlePostAuthorFontColor,
          singlePostAuthorFontSize,
          singlePostAuthorImageSize,
        },
      }),
      invalidatesTags: ["bodyTheme"],
    }),
    updateMenu: builder.mutation({
      query: ({ id, menuTitleFontSize, menuTitleFontColor, menuBg }) => ({
        url: `/body-theme/${id}`,
        method: "PUT",
        body: { menuTitleFontSize, menuTitleFontColor, menuBg },
      }),
      invalidatesTags: ["bodyTheme"],
    }),
    updateSinglePostPublishDate: builder.mutation({
      query: ({
        id,
        singlePostPublishDateFontColor,
        singlePostPublishDateFontSize,
      }) => ({
        url: `/body-theme/${id}`,
        method: "PUT",
        body: { singlePostPublishDateFontColor, singlePostPublishDateFontSize },
      }),
      invalidatesTags: ["bodyTheme"],
    }),
    updateSinglePostQilll: builder.mutation({
      query: ({ id, singlePostQuillFontColor, singlePostQuillFontSize }) => ({
        url: `/body-theme/${id}`,
        method: "PUT",
        body: { singlePostQuillFontColor, singlePostQuillFontSize },
      }),
      invalidatesTags: ["bodyTheme"],
    }),
    updateSinglePostLatestNewsCard: builder.mutation({
      query: ({
        id,
        latestNewsCardBg,
        latestNewsCardFontColor,
        latestNewsCardFontSize,
      }) => ({
        url: `/body-theme/${id}`,
        method: "PUT",
        body: {
          latestNewsCardBg,
          latestNewsCardFontColor,
          latestNewsCardFontSize,
        },
      }),
      invalidatesTags: ["bodyTheme"],
    }),
    updateSinglePostPopularNewsCard: builder.mutation({
      query: ({
        id,
        popularNewsCardBg,
        popularNewsCardFontColor,
        popularNewsCardFontSize,
      }) => ({
        url: `/body-theme/${id}`,
        method: "PUT",
        body: {
          popularNewsCardBg,
          popularNewsCardFontColor,
          popularNewsCardFontSize,
        },
      }),
      invalidatesTags: ["bodyTheme"],
    }),
    updateMoreNews: builder.mutation({
      query: ({ id, moreNewsTitleFontColor, moreNewsTitleFontSize }) => ({
        url: `/body-theme/${id}`,
        method: "PUT",
        body: { moreNewsTitleFontColor, moreNewsTitleFontSize },
      }),
      invalidatesTags: ["bodyTheme"],
    }),
    updateCategoryTitle: builder.mutation({
      query: ({
        id,
        categoryBg,
        categoryTitleFontColor,
        categoryTitleFontSize,
        isCategoryBordered,
        categoryBorderStyle,
        categoryBorderColor,
        categoryBorderWidth,
      }) => ({
        url: `/body-theme/${id}`,
        method: "PUT",
        body: {
          categoryBg,
          categoryTitleFontColor,
          categoryTitleFontSize,
          isCategoryBordered,
          categoryBorderStyle,
          categoryBorderColor,
          categoryBorderWidth,
        },
      }),
      invalidatesTags: ["bodyTheme"],
    }),
    updateNewsHeadlineTitle: builder.mutation({
      query: ({
        id,
        newsHeadlineTitleFontSize,
        newsHeadlineTitleFontColor,
        newsHeadlineBg,
      }) => ({
        url: `/body-theme/${id}`,
        method: "PUT",
        body: {
          newsHeadlineTitleFontSize,
          newsHeadlineTitleFontColor,
          newsHeadlineBg,
        },
      }),
      invalidatesTags: ["bodyTheme"],
    }),
  }),
});
export const {
  useGetBodyThemeQuery,
  useUpdateBodyBgMutation,
  useUpdateSinglePostBgMutation,
  useUpdateNewsCardMutation,
  useUpdateSinglePostTitleMutation,
  useUpdateMarqueMutation,
  useUpdateSinglePostAuthorMutation,
  useUpdateMenuMutation,
  useUpdateSinglePostPublishDateMutation,
  useUpdateSinglePostQilllMutation,
  useUpdateSinglePostLatestNewsCardMutation,
  useUpdateSinglePostPopularNewsCardMutation,
  useUpdateMoreNewsMutation,
  useUpdateCategoryTitleMutation,
  useUpdateNewsHeadlineTitleMutation,
} = bodyThemeApi;
