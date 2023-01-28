import { useEffect, useState } from "react";

import { EventList } from "../molecules";
import { getToken } from "../../utils/storage";
import { useGetEnrolledEventQuery } from "../../api/eventApi";

const EventHistory = ({ searchValue }) => {
  const [responseMessage, setResponseMessage] = useState("");

  const {
    data: enrolledEventList,
    isSuccess,
    isError,
  } = useGetEnrolledEventQuery(getToken());

  useEffect(() => {
    if (isSuccess) {
      setResponseMessage("Success Get Enrolled Event List");
    } else if (isError) {
      setResponseMessage("Failed Get Enrolled Event List");
    }

    console.log(responseMessage);
  }, [enrolledEventList, isError, isSuccess, responseMessage]);

  return (
    <EventList
      data={enrolledEventList}
      searchValue={searchValue}
      type="history"
    />
  );
};

export default EventHistory;
