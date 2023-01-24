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
    fontSize: "20px"
  },
};

const Home = () => {
  return (
    <div
      style={styles.container}
      className="container d-flex flex-column mx-auto px-4 rounded general-style"
    >
      <div className="row w-100 mb-4">
        <div className="col-3 my-auto" style={styles.header}>
          Event
        </div>
        <div className="col-2 my-auto" style={styles.header}>
          Date
        </div>
        <div className="col-2 my-auto" style={styles.header}>
          Location
        </div>
        <div className="col-2 my-auto" style={styles.header}>
          Participant
        </div>
        <div className="col-2 my-auto" style={styles.header}>
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
