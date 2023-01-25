import { api } from "./api";
import { STUDENT_AUTH_URL } from "../constants/api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    mahasiswaRegistration: builder.mutation({
      invalidateTags: ["auth"],
      query: (payload) => {
        return {
          url: `${STUDENT_AUTH_URL}/registration`,
          method: "POST",
          body: payload,
        };
      },
    }),

    mahasiswaLogin: builder.mutation({
      invalidatesTags: ["auth"],
      query: (payload) => ({
        url: `${STUDENT_AUTH_URL}/login`,
        method: "POST",
        body: payload,
      }),
    }),

    mahasiswaResetPassword: builder.mutation({
      invalidatesTags: ["auth"],
      query: (payload) => ({
        url: `${STUDENT_AUTH_URL}/reset-password`,
        method: "POST",
        body: payload,
      }),
    }),

    mahasiswaNewPassword: builder.mutation({
      invalidatesTags: ["auth"],
      query: (payload) => ({
        url: `${STUDENT_AUTH_URL}/new-password`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useMahasiswaRegistrationMutation,
  useMahasiswaLoginMutation,
  useMahasiswaResetPasswordMutation,
  useMahasiswaNewPasswordMutation,
} = authApi;
