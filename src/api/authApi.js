import { api } from "./api";
import { STUDENT_AUTH_URL } from "../constants/api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    mahasiswaRegistration: builder.mutation({
      query: (payload) => {
        return {
          url: `${STUDENT_AUTH_URL}/registration`,
          method: "POST",
          body: payload,
        };
      },
    }),

    mahasiswaLogin: builder.mutation({
      query: (payload) => ({
        url: `${STUDENT_AUTH_URL}/login`,
        method: "POST",
        body: payload,
      }),
    }),

    getMahasiswaDetail: builder.query({
      providesTags: ["auth"],
      query: (id) => ({
        url: `${STUDENT_AUTH_URL}/${id}`,
        method: "GET",
      }),
    }),

    mahasiswaResetPassword: builder.mutation({
      query: (payload) => ({
        url: `${STUDENT_AUTH_URL}/reset-password`,
        method: "POST",
        body: payload,
      }),
    }),

    mahasiswaNewPassword: builder.mutation({
      query: ({ payload, token }) => ({
        url: `${STUDENT_AUTH_URL}/new-password/${token}`,
        method: "POST",
        body: payload,
      }),
    }),

    updateProfileMahasiswa: builder.mutation({
      invalidatesTags: ["auth"],
      query: ({ id, payload }) => ({
        url: `${STUDENT_AUTH_URL}/update-profile/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    updateProfileImageMahasiswa: builder.mutation({
      invalidatesTags: ["auth"],
      query: (payload) => ({
        url: `${STUDENT_AUTH_URL}/upload-profile`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useMahasiswaRegistrationMutation,
  useMahasiswaLoginMutation,
  useGetMahasiswaDetailQuery,
  useMahasiswaResetPasswordMutation,
  useMahasiswaNewPasswordMutation,
  useUpdateProfileMahasiswaMutation,
  useUpdateProfileImageMahasiswaMutation,
} = authApi;
