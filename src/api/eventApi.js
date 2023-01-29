import { api } from "./api";
import { STUDENT_EVENT_URL } from "../constants/api";

export const eventApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEventList: builder.query({
      providesTags: ["eventList"],
      query: () => {
        return {
          url: `${STUDENT_EVENT_URL}/`,
          method: "GET",
        };
      },
    }),

    getEnrolledEvent: builder.query({
      providesTags: ["eventList"],
      query: (id) => {
        return {
          url: `${STUDENT_EVENT_URL}-enrolled/list-enrolled/${id}`,
          method: "GET",
        };
      },
    }),

    getEventDetail: builder.query({
      providesTags: ["eventList"],
      query: (id) => {
        return {
          url: `${STUDENT_EVENT_URL}/detail/${id}`,
          method: "GET",
        };
      },
    }),

    getEnrolledEventDetail: builder.query({
      providesTags: ["eventList"],
      query: (id) => {
        return {
          url: `${STUDENT_EVENT_URL}-enrolled/view/${id}`,
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
      invalidatesTags: ["event"],
      query: (id) => {
        return {
          url: `${STUDENT_EVENT_URL}/delete/${id}`,
          method: "DELETE",
        };
      },
    }),

    updateEvent: builder.mutation({
      invalidatesTags: ["event"],
      query: ({ id, payload }) => {
        return {
          url: `${STUDENT_EVENT_URL}/update-event/${id}`,
          method: "PUT",
          body: payload,
        };
      },
    }),

    registerEvent: builder.mutation({
      query: (payload) => {
        return {
          url: `${STUDENT_EVENT_URL}-enrolled/regis-event`,
          method: "POST",
          body: payload,
        };
      },
    }),

    updateEventImage: builder.mutation({
      invalidatesTags: ["event"],
      query: (payload) => ({
        url: `${STUDENT_EVENT_URL}/upload`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetEventListQuery,
  useGetEnrolledEventQuery,
  useGetEventDetailQuery,
  useGetEnrolledEventDetailQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
  useRegisterEventMutation,
  useUpdateEventImageMutation,
} = eventApi;
