import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const styles = {
  successVector: {
    width: "350px",
  },
};

const RegistrationSuccessModal = ({
  eventId,
  isRegistrationSuccessModalOpen,
  setIsRegistrationSuccessModalOpen,
}) => {
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
    <Modal show={isRegistrationSuccessModalOpen} size="lg" centered>
      <Modal.Dialog className="border-0">
        <Modal.Body>
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
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
};

export default RegistrationSuccessModal;
