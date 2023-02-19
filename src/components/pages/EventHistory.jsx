import { useEffect, useState } from "react";

import { EventList } from "../molecules";
import { getToken } from "../../utils/storage";
import { useGetEnrolledEventQuery } from "../../api/eventApi";

const EventHistory = ({ searchValue }) => {
  const delay = 500; // 0.5 second after user not type, API will fetch
  const [debouncedValue, setDebouncedValue] = useState(searchValue); // Delay for search event API

  const { data: enrolledEventList } = useGetEnrolledEventQuery(getToken());

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  return (
    <EventList
      data={enrolledEventList}
      searchValue={debouncedValue}
      type="history"
    />
  );
};

export default EventHistory;
