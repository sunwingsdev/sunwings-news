import baseApi from "../../baseApi";
const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPaymentInfo: builder.mutation({
      query: (data) => ({
        url: "/payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payments"],
    }),
  }),
});
export const { useAddPaymentInfoMutation } = paymentApi;
