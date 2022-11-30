const styles = {
  container: {
    maxWidth: "110rem",
    width: "100%",
    backgroundColor: "gray",
    marginTop: "5rem",
    padding: "3rem 6rem",
  },
  eventDetail: {
    minWidth: "60%",
  },
  eventPoster: {
    width: "500px",
  },
  eventDetailDescription: {
    lineHeight: "1.8rem",
    textAlign: "justify",
  },
};

const EventDetail = () => {
  return (
    <div style={styles.container} className="container mx-auto rounded mb-5">
      <div className="d-flex me-5">
        <img
          style={styles.eventPoster}
          src={require("../assets/example-event-poster.jpg")}
          alt="Example Event Poster"
          className="img-fluid me-5"
        />
        <div
          className="d-flex flex-column justify-content-around mx-5"
          style={styles.eventDetail}
        >
          <div className="row">
            <span className="col-3 h4">Title</span>
            <span className="col-9 h3">Example Event Title</span>
          </div>
          <div className="row">
            <span className="col-3 h4">Organizer</span>
            <span className="col-9 h3">Example Event Organizer</span>
          </div>
          <div className="row">
            <span className="col-3 h4">Date</span>
            <span className="col-9 h3">Example Event Date</span>
          </div>
          <div className="row">
            <span className="col-3 h4">Location</span>
            <span className="col-9 h3">Example Event Location</span>
          </div>
          <div className="row">
            <span className="col-3 h4">Participant</span>
            <span className="col-9 h3">Example Event Participant</span>
          </div>
          <div className="row">
            <span className="col-3 h4">Price</span>
            <span className="col-9 h3">Example Event Price</span>
          </div>
          <div className="row">
            <button type="button" className="btn btn-primary py-2  col-12">
              <p className="h4">Register</p>
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className="h2 mt-5">Event Details</p>
        <p className="h6 mt-3" style={styles.eventDetailDescription}>
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
    </div>
  );
};

export default EventDetail;
