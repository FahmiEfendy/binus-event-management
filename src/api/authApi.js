import { api } from "./api";
import { STUDENT_AUTH_URL } from "../constants/api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    mahasiswaRegistration: builder.mutation({
      invalidateTags: ["auth"],
      query: (payload) => {
        return {
          url: `http://binus-event.com:8081/binus-event-api/auth/mahasiswa/registration`,
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
        data: payload,
      }),
    }),

    mahasiswaResetPassword: builder.mutation({
      invalidatesTags: ["auth"],
      query: (payload) => ({
        url: `${STUDENT_AUTH_URL}/reset-password`,
        method: "POST",
        data: payload,
      }),
    }),

    mahasiswaNewPassword: builder.mutation({
      invalidatesTags: ["auth"],
      query: (payload) => ({
        url: `${STUDENT_AUTH_URL}/new-password`,
        method: "POST",
        data: payload,
      }),
    }),
  }),
});

export const { useMahasiswaRegistrationMutation } = authApi;
