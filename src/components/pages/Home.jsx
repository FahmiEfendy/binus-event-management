import { EventBar } from "../atoms";

const styles = {
  container: {
    maxWidth: "110rem",
    width: "100%",
    backgroundColor: "gray",
    marginTop: "5rem",
    padding: "3rem 1rem",
  },
  header: {
    fontWeight: "600",
    fontSize: "22px",
  },
};

const Home = () => {
  return (
    <div
      style={styles.container}
      className="container d-flex flex-column mx-auto px-4 rounded"
    >
      <div className="row w-100 mb-4">
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
          Price
        </div>
        <div className="col-1 d-flex" style={styles.header}>
          <button type="button" className="btn btn-light px-3 mx-auto">
            <i className="bi bi-funnel px-1" aria-hidden="true"></i>Filter
          </button>
        </div>
      </div>
      <EventBar />
      <hr />
      <EventBar />
      <hr />
      <EventBar />
      <hr />
      <EventBar />
      <hr />
      <EventBar />
    </div>
  );
};

export default Home;
