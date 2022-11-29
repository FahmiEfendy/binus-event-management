const styles = {
  eventOrganizerLogo: {
    height: "40px",
    width: "60px",
    backgroundColor: "white",
  },
};

const EventBar = (props) => {
  const { type } = props;

  return (
    <div className="row w-100 d-flex align-items-center">
      <div className="col-3 d-flex">
        <img
          style={styles.eventOrganizerLogo}
          className="rounded my-auto"
          src={require("../assets/logo-binus.png")}
          alt="Example Event Organizer Logo"
        />
        <div className="mx-3">
          <p className="my-1">Example Event Name</p>
          <p className="my-1">Example Event Organizer</p>
        </div>
      </div>
      <div className="col-2">Example Event Date</div>
      <div className="col-2">Example Event Location</div>
      <div className="col-2">Example Event Participant</div>
      <div className="col-2">{`Example Event ${
        type === "history" ? "Status" : "Price"
      }`}</div>
      <div className="col-1 d-flex">
        <button type="button" className="btn btn-primary px-4 mx-auto">
          Detail
        </button>
      </div>
    </div>
  );
};

export default EventBar;
