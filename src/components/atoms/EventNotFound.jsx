import { CalendarX } from "react-bootstrap-icons";

const EventNotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center my-5">
      <h1 className="text-danger mb-3">
        <CalendarX />
      </h1>
      <h1 className="text-danger">Event Not Found</h1>
    </div>
  );
};

export default EventNotFound;
