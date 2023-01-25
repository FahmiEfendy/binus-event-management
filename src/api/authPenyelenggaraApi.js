import { api } from "./api";
import { PENYELENGGARRA_AUTH_URL } from "../constants/api";

export const authPenyelenggaraApi = api.injectEndpoints({
  endpoints: (builder) => ({
    penyelenggaraLogin: builder.mutation({
      invalidatesTags: ["authPenyelenggara"],
      query: (payload) => ({
        url: `${PENYELENGGARRA_AUTH_URL}/login`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { usePenyelenggaraLoginMutation } = authPenyelenggaraApi;
