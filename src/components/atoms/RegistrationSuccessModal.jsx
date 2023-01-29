import { useNavigate } from "react-router-dom";

const styles = {
  successVector: {
    width: "350px",
  },
};

const RegistrationSuccessModal = ({setIsRegistrationSuccessModalOpen, eventId}) => {

  const navigate = useNavigate();

  const goCheckEventHistoryHandler = () => {
    setIsRegistrationSuccessModalOpen(false);
    navigate(`/detail/enrolled/${eventId}`);
  };

  const goHomepageHandler = () => {
    setIsRegistrationSuccessModalOpen(false);
    navigate("/");
  };

  return (
    <div
      className="modal fade"
      id="registrationSuccessModal"
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
          <div className="modal-body d-flex flex-column align-items-center pt-4 pb-5">
            <img
              style={styles.successVector}
              src={require("../../assets/success-vector.png")}
              alt="Registration Success"
              className="img-fluid mx-5"
            />
            <p className="h2 mt-3 mb-2 text-center">Registration Success</p>
            <div className="d-flex justify-content-center mt-3 mb-2">
              <button
                type="button"
                className="btn btn-light mx-4 px-5"
                data-dismiss="modal"
                aria-label="Close"
                onClick={goCheckEventHistoryHandler}
              >
                Check Event History
              </button>
              <button
                type="button"
                className="btn btn-primary mx-4 px-5"
                data-dismiss="modal"
                aria-label="Close"
                onClick={goHomepageHandler}
              >
                Back to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessModal;
