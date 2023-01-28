import { api } from "./api";
import { PENYELENGGARRA_AUTH_URL } from "../constants/api";

export const authPenyelenggaraApi = api.injectEndpoints({
  endpoints: (builder) => ({
    penyelenggaraLogin: builder.mutation({
      query: (payload) => ({
        url: `${PENYELENGGARRA_AUTH_URL}/login`,
        method: "POST",
        body: payload,
      }),
    }),

    getPenyelenggaraDetail: builder.query({
      query: (id) => ({
        url: `${PENYELENGGARRA_AUTH_URL}/${id}`,
        method: "GET",
      }),
    }),

    updatePenyelenggara: builder.mutation({
      query: ({ id, payload }) => ({
        url: `${PENYELENGGARRA_AUTH_URL}/update-profile/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  usePenyelenggaraLoginMutation,
  useGetPenyelenggaraDetailQuery,
  useUpdatePenyelenggaraMutation,
} = authPenyelenggaraApi;
