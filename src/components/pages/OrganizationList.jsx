import { OrganizationBar } from "../atoms";

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

const OrganizationList = () => {
  return (
    <div
      style={styles.container}
      className="container d-flex flex-column mx-auto px-4 rounded general-style"
    >
      <div className="row w-100 mb-4">
        <div className="col-5" style={styles.header}>
          Organization
        </div>
        <div className="col-5" style={styles.header}>
          Type
        </div>
        <div className="col-2 d-flex" style={styles.header}>
          <button type="button" className="btn btn-light px-3 mx-auto">
            <i className="bi bi-funnel px-1" aria-hidden="true"></i>Filter
          </button>
        </div>
      </div>
      <OrganizationBar />
      <hr />
      <OrganizationBar />
      <hr />
      <OrganizationBar />
    </div>
  );
};

export default OrganizationList;
