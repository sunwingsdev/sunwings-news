import baseApi from "../../baseApi";

const userSupportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendEmail: builder.mutation({
      query: (data) => ({
        url: "/support/send-email",
        method: "POST",
        body: data,
      }),
      providesTags: ["emailTag"],
    }),
  }),
});

export const { useSendEmailMutation } = userSupportApi;
