import { EventBar } from "../atoms";

const styles = {
  container: {
    maxWidth: "110rem",
    width: "100%",
    backgroundColor: "gray",
    marginTop: "5rem",
    padding: "3rem 6rem",
  },
  organizationLogo: {
    width: "500px",
    backgroundColor: "white",
  },
  organizationDetail: {
    minWidth: "60%",
  },
  organizationDetailDescription: {
    lineHeight: "1.8rem",
    textAlign: "justify",
  },
  header: {
    fontWeight: "600",
    fontSize: "22px",
  },
};

const OrganizationDetail = () => {
  return (
    <div style={styles.container} className="container mx-auto rounded mb-5">
      <div className="d-flex me-5">
        <img
          style={styles.organizationLogo}
          src={require("../../assets/logo-binus.png")}
          alt="Example Event Poster"
          className="img-fluid me-5"
        />
        <div
          className="d-flex flex-column justify-content-around mx-5"
          style={styles.organizationDetail}
        >
          <div className="row">
            <span className="col-3 h4">Organization</span>
            <span className="col-9 h3">Example Organization</span>
          </div>
          <div className="row">
            <span className="col-3 h4">Organization Type</span>
            <span className="col-9 h3">Example Organization Type</span>
          </div>
        </div>
      </div>
      <div>
        <p className="h2 mt-5 mb-4">Organization Details</p>
        <p className="h6 mt-3" style={styles.organizationDetailDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a
          pellentesque risus, id aliquam urna. Mauris feugiat feugiat urna, at
          placerat tellus fermentum id. Nam pellentesque, mauris sed faucibus
          tempus, ante felis finibus tortor, et pretium est nibh a leo. Proin
          placerat in eros eu interdum. Sed sollicitudin ipsum non finibus
          lacinia. Suspendisse potenti. Donec erat orci, malesuada eu neque id,
          euismod ultrices metus. Suspendisse dolor quam, faucibus ac sem
          pharetra, dictum tristique felis. Maecenas a libero dictum, tempus
          mauris a, lobortis augue. Integer eu justo sit amet mi sodales
          condimentum non vel massa. Cras vitae sodales nibh, vel tempus erat.
          Sed id est ex. Mauris sagittis, dolor quis volutpat rutrum, leo nisi
          elementum nisl, eget porta nisl tellus id arcu. Fusce ac vulputate
          enim. In ac nisl dui. Fusce et dui iaculis, vehicula dolor sit amet,
          dignissim lectus. Aliquam at metus quis ex consequat venenatis.
          Phasellus elementum metus velit, eget tempor sem iaculis sed. Integer
          quis molestie orci. Donec vitae hendrerit velit. Nullam eu ligula vel
          tellus tempor consequat. Duis luctus tortor laoreet odio vehicula
          auctor. Integer metus tellus, cursus et felis at, pulvinar ultrices
          felis. Suspendisse justo orci, consequat in molestie eget, rhoncus ut
          massa. Sed et tellus sit amet turpis scelerisque malesuada eget ac
          nibh.
        </p>
      </div>
      <div>
        <p className="h2 mt-5 mb-4">Organization Events</p>
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
    </div>
  );
};

export default OrganizationDetail;
