import { EventList } from "../molecules";
import { getToken } from "../../utils/storage";
import { useGetEnrolledEventQuery } from "../../api/eventApi";

const EventHistory = ({ searchValue }) => {
  const { data: enrolledEventList } = useGetEnrolledEventQuery(getToken());

  return (
    <EventList
      data={enrolledEventList}
      searchValue={searchValue}
      type="history"
    />
  );
};

export default EventHistory;
