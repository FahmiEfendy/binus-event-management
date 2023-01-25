import { useNavigate } from "react-router-dom";

const styles = {
  eventOrganizerLogo: {
    height: "40px",
    width: "60px",
    backgroundColor: "white",
  },
};

const EventBar = ({
  type,
  eventId,
  title,
  organizer,
  date,
  location,
  participant,
  price,
}) => {
  const navigate = useNavigate();

  const eventDetailHandler = () => {
    navigate(`/detail/${eventId}`);
  };

  const eventHistoryDetailHandler = () => {
    navigate("/example-event-history-path");
  };

  return (
    <div className="row w-100 d-flex align-items-center rounded table-list-border">
      <div className="col-3 d-flex">
        {/* TODO : img src should get from BE */}
        <img
          style={styles.eventOrganizerLogo}
          className="rounded my-auto"
          src={require("../../assets/logo-binus.png")}
          alt="Example Event Organizer Logo"
        />
        <div className="mx-3">
          <p className="my-1">{title}</p>
          <p className="my-1">{organizer}</p>
        </div>
      </div>
      <div className="col-2">{date}</div>
      <div className="col-2">{location}</div>
      <div className="col-2">{participant}</div>
      <div className="col-2">{`${
        type === "history" ? "Status" : `${price}`
      }`}</div>
      <div className="col-1 d-flex">
        <button
          type="button"
          className="btn btn-primary px-4 mx-auto"
          onClick={
            type === "history" ? eventHistoryDetailHandler : eventDetailHandler
          }
        >
          Detail
        </button>
      </div>
    </div>
  );
};

export default EventBar;
