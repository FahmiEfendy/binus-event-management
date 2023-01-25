import { api } from "./api";
import { STUDENT_EVENT_URL } from "../constants/api";

export const eventApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEventList: builder.query({
      invalidatesTags: ["event"],
      query: () => {
        return {
          url: `${STUDENT_EVENT_URL}/`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetEventListQuery } = eventApi;
