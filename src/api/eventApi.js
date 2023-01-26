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

    getEventDetail: builder.query({
      invalidatesTags: ["event"],
      query: (id) => {
        return {
          url: `${STUDENT_EVENT_URL}/detail/${id}`,
          method: "GET",
        };
      },
    }),

    createEvent: builder.mutation({
      invalidatesTags: ["event"],
      query: (payload) => {
        return {
          url: `${STUDENT_EVENT_URL}/create`,
          method: "POST",
          body: payload,
        };
      },
    }),

    deleteEvent: builder.mutation({
      invalidatesTags: ["Event"],
      query: (id) => {
        return {
          url: `${STUDENT_EVENT_URL}/delete/${id}`,
          method: "DELETE",
        };
      },
    }),

    updateEvent: builder.mutation({
      invalidatesTags: ["Event"],
      query: ({ id, payload }) => {
        return {
          url: `${STUDENT_EVENT_URL}/update-event/${id}`,
          method: "PUT",
          body: payload,
        };
      },
    }),
  }),
});

export const { useGetEventListQuery, useGetEventDetailQuery } = eventApi;