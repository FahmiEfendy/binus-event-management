import moment from "moment";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  useGetEventDetailQuery,
  useGetEventParticipantQuery,
  useGetEnrolledEventDetailQuery,
  useRegisterEventMutation,
} from "../../api/eventApi";
import {
  Loading,
  RegisterConfirmationModal,
  RegistrationSuccessModal,
  ToastNotif,
} from "../atoms";

const styles = {
  container: {
    maxWidth: "110rem",
    width: "92%",
    marginTop: "3rem",
    padding: "3rem 5rem",
  },
  eventDetail: {
    minWidth: "60%",
  },
  eventPoster: {
    minWidth: "400px",
    maxWidth: "500px",
    height: "480px",
  },
  eventDetailDescription: {
    lineHeight: "1.8rem",
    textAlign: "justify",
  },
};

const EventDetail = ({ type }) => {
  const [file, setFile] = useState(null);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isRegistrationSuccessModalOpen, setIsRegistrationSuccessModalOpen] =
    useState(false);

  const { eventId } = useParams();

  const { data: eventDetail, isLoading } = useGetEventDetailQuery(eventId);

  const { data: eventEnrolledDetail, isLoading: isLoadingGetEnrolledDetail } =
    useGetEnrolledEventDetailQuery(eventId);

  const { data: eventParticipant } = useGetEventParticipantQuery(eventId);

  const [, { isSuccess: isSuccessRegister, isError: isErrorRegister }] =
    useRegisterEventMutation();

  const registerHandler = () => {
    setIsRegisterModalOpen(true);
  };

  const closeToastHandler = () => {
    setIsToastOpen(false);
  };

  useEffect(() => {
    if (isSuccessRegister) {
      setResponseMessage("Event registered successfully");
    } else if (isErrorRegister) {
      setResponseMessage("Failed to register event!");
    }

    if (isSuccessRegister || isErrorRegister) {
      setIsToastOpen(true);
    }
  }, [isErrorRegister, isSuccessRegister]);

  useEffect(() => {
    if (eventDetail?.image != null) {
      const buffertoB64 = Buffer.from(eventDetail?.image.data.data).toString(
        "base64"
      );
      const formattedB64 = `data:image/png;base64,${buffertoB64}`;
      setFile(formattedB64);
    }
  }, [eventDetail?.image]);

  return (
    <div
      style={styles.container}
      className="container mx-auto rounded mb-5 general-style"
    >
      {!isLoadingGetEnrolledDetail && !isLoading ? (
        <>
          <div className="d-flex me-5">
            <img
              style={styles.eventPoster}
              src={
                eventDetail?.image
                  ? file
                  : require("../../assets/example-event-poster.jpg")
              }
              alt="Example Event Poster"
              className="img-fluid border"
            />
            <div
              className="d-flex flex-column mt-5 mx-5"
              style={styles.eventDetail}
            >
              <div className="row align-items-center mt-2">
                <span className="col-3 h4">Title</span>
                <span className="col-9 h5">
                  {eventDetail?.title ||
                    (eventEnrolledDetail &&
                      eventEnrolledDetail[0]?.eventEnrolled.title)}
                </span>
              </div>
              <div className="row mt-3">
                <span className="col-3 h4">Organizer</span>
                <span className="col-9 h5">
                  {eventDetail?.organizer ||
                    (eventEnrolledDetail &&
                      eventEnrolledDetail[0]?.eventEnrolled.organizer)}
                </span>
              </div>
              <div className="row mt-3">
                <span className="col-3 h4">Start Date</span>
                <span className="col-9 h5">
                  {moment(
                    eventDetail?.startDate ||
                      (eventEnrolledDetail &&
                        eventEnrolledDetail[0]?.eventEnrolled.startDate)
                  ).format("LL")}
                </span>
              </div>
              <div className="row mt-3">
                <span className="col-3 h4">Type</span>
                <span className="col-9 h5">
                  {eventDetail?.eventType ||
                    (eventEnrolledDetail &&
                      eventEnrolledDetail[0]?.eventEnrolled.eventType)}
                </span>
              </div>
              <div className="row mt-3">
                <span className="col-3 h4">Location</span>
                <span className="col-9 h5">
                  {eventDetail?.location ||
                    (eventEnrolledDetail &&
                      eventEnrolledDetail[0]?.eventEnrolled.location)}
                </span>
              </div>
              <div className="row mt-3">
                <span className="col-3 h4">Participant</span>
                <span className="col-9 h5">
                  {(eventParticipant &&
                    eventParticipant[0]?.mahasiswaList.length) ||
                    0}
                  {" / "}
                  {eventDetail?.totalQuota ||
                    (eventEnrolledDetail &&
                      eventEnrolledDetail[0]?.eventEnrolled.totalQuota)}
                </span>
              </div>
              <div className="row mt-3">
                <span className="col-3 h4">
                  {type === "history" ? "Status" : "Price"}
                </span>
                <span className="col-9 h5">{`${
                  type === "history" ? "Status" : `${eventDetail?.price}`
                }`}</span>
              </div>
              {type === "history" ? (
                ""
              ) : (
                <div className="mt-auto">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#registrationConfirmationModal"
                    onClick={registerHandler}
                  >
                    <p className="h6 m-auto px-3 py-1">Register</p>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="h4 mt-5">Detail</p>
            <p className="h6 mt-3" style={styles.eventDetailDescription}>
              {eventDetail?.description ||
                (eventEnrolledDetail &&
                  eventEnrolledDetail[0]?.eventEnrolled.description)}
            </p>
          </div>
        </>
      ) : (
        <Loading />
      )}
      {isRegisterModalOpen && (
        <RegisterConfirmationModal
          eventId={eventId}
          setIsRegisterModalOpen={setIsRegisterModalOpen}
          setIsRegistrationSuccessModalOpen={setIsRegistrationSuccessModalOpen}
        />
      )}
      {isRegistrationSuccessModalOpen && (
        <RegistrationSuccessModal
          eventId={eventId}
          setIsRegistrationSuccessModalOpen={setIsRegistrationSuccessModalOpen}
        />
      )}

      <ToastNotif
        responseMessage={responseMessage}
        isOpen={isToastOpen}
        onClose={closeToastHandler}
      />
    </div>
  );
};

export default EventDetail;
