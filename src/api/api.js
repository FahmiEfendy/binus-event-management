import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getToken } from "../utils/storage";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: (headers) => {
      const token = getToken();

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["binusAuth", "eventApi"],
  endpoints: () => ({}),
});
