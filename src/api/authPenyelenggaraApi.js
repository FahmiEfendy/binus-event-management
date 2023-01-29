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
      providesTags: ["auth"],
      query: (id) => ({
        url: `${PENYELENGGARRA_AUTH_URL}/${id}`,
        method: "GET",
      }),
    }),

    updatePenyelenggara: builder.mutation({
      invalidatesTags: ["auth"],
      query: ({ id, payload }) => ({
        url: `${PENYELENGGARRA_AUTH_URL}/update-profile/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    updateProfilePenyelenggaraImage: builder.mutation({
      invalidatesTags: ["auth"],
      query: (payload) => ({
        url: `${PENYELENGGARRA_AUTH_URL}/upload-profile`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  usePenyelenggaraLoginMutation,
  useGetPenyelenggaraDetailQuery,
  useUpdatePenyelenggaraMutation,
  useUpdateProfilePenyelenggaraImageMutation,
} = authPenyelenggaraApi;
