import { getToken } from "../../utils/storage";
import {
  useGetEventDetailQuery,
  useRegisterEventMutation,
} from "../../api/eventApi";

const styles = {
  eventPoster: {
    width: "250px",
    height: "220px",
  },
  buttonClose: {
    border: "none",
    backgroundColor: "transparent",
  },
};

const RegisterConfirmationModal = ({
  eventId,
  setIsRegisterModalOpen,
  setIsRegistrationSuccessModalOpen,
  eventImage,
  eventQuota,
  eventParticipant,
}) => {
  const [registEvent, { reset }] = useRegisterEventMutation({
    fixedCacheKey: "registerEvent",
  });

  const { data: eventDetail } = useGetEventDetailQuery(eventId);

  const registerHandler = async () => {
    const payload = {
      token: getToken(),
      eventId,
    };
    await registEvent(payload);

    setIsRegisterModalOpen(false);
    reset();
  };

  const closeModalHandler = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <>
      <div
        className="modal fade"
        id="registrationConfirmationModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          style={{ maxWidth: "650px" }}
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title ms-2" id="exampleModalLongTitle">
                Event Register Confirmation
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModalHandler}
                style={styles.buttonClose}
              >
                <i className="bi bi-x-circle"></i>
              </button>
            </div>
            <div className="modal-body d-flex pt-4 pb-5">
              <img
                style={styles.eventPoster}
                src={eventImage}
                alt="Example Event Poster"
                className="img-fluid mx-4 w-25 border"
              />
              <div className="w-75 d-flex flex-column mt-2">
                <p className="h3">{eventDetail?.title}</p>
                <p className="h4 mt-2">{eventDetail?.organizer}</p>
                <p className=" h5 mt-auto">Are you sure want to register?</p>
                <div className="d-flex mt-3">
                  <button
                    type="button"
                    className="btn btn-light me-3 px-4"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={closeModalHandler}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary px-4"
                    data-toggle="modal"
                    data-target="#registrationSuccessModal"
                    data-dismiss="modal"
                    aria-label="Close"
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
    </>
  );
};

export default RegisterConfirmationModal;
