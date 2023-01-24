import { EventBar } from "../atoms";

const styles = {
  container: {
    maxWidth: "110rem",
    width: "97%",
    marginTop: "3rem",
    padding: "2rem",
  },
  header: {
    fontWeight: "600",
    fontSize: "22px",
  },
};

const EventHistory = () => {
  return (
    <div
      style={styles.container}
      className="container d-flex flex-column mx-auto px-4 rounded general-style"
    >
      <div className="row w-100 mb-4 mx-auto px-3">
        <div className="col-3" style={styles.header}>
          Event
        </div>
        <div className="col-2" style={styles.header}>
          Date
        </div>
        <div className="col-2" style={styles.header}>
          Location
        </div>
        <div className="col-2" style={styles.header}>
          Participant
        </div>
        <div className="col-2" style={styles.header}>
          Status
        </div>
        <div className="col-1 d-flex" style={styles.header}>
          <button type="button" className="btn btn-light px-3 d-flex">
            <i className="bi bi-funnel px-1" aria-hidden="true"></i>Filter
          </button>
        </div>
      </div>

      <div className="w-100 ms-3">
        <EventBar type="history" />
        <EventBar type="history" />
        <EventBar type="history" />
      </div>
    </div>
  );
};

export default EventHistory;
