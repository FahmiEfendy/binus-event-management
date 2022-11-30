const styles = {
  eventPoster: {
    width: "250px",
  },
};

const RegisterConfirmationModal = (props) => {
  const { setIsRegisterModalOpen } = props;

  const registerHandler = () => {
    console.log("Registered!");
  };

  const closeModalHandler = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Event Register Confirmation
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeModalHandler}
            >
              <i className="bi bi-x-circle"></i>
            </button>
          </div>
          <div className="modal-body d-flex pt-4 pb-5">
            <img
              style={styles.eventPoster}
              src={require("../assets/example-event-poster.jpg")}
              alt="Example Event Poster"
              className="img-fluid mx-5 w-25"
            />
            <div className="w-75 d-flex flex-column">
              <p className="h1">Example Event Title</p>
              <p className="h4 mt-2">Example Event Organizer</p>
              <p className="text-center h4 mt-auto">
                Are you sure want to register?
              </p>
              <div className="d-flex justify-content-center mt-3 mb-2">
                <button
                  type="button"
                  className="btn btn-light border border-primary mx-4 px-5"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModalHandler}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary mx-4 px-5"
                  onClick={registerHandler}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterConfirmationModal;
