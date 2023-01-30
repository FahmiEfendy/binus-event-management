import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  useGetEventDetailQuery,
  useGetEnrolledEventDetailQuery,
} from "../../api/eventApi";
import {
  Loading,
  RegisterConfirmationModal,
  RegistrationSuccessModal,
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
  const [responseMessage, setResponseMessage] = useState("");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isRegistrationSuccessModalOpen, setIsRegistrationSuccessModalOpen] =
    useState(false);

  const { eventId } = useParams();

  const {
    data: eventDetail,
    isSuccess,
    isError,
    isLoading,
  } = useGetEventDetailQuery(eventId);

  const {
    data: eventEnrolledDetail,
    isSuccess: isSuccessGetEnrolledDetail,
    isLoading: isLoadingGetEnrolledDetail,
    isError: isErrorGetEnrolledDetail,
  } = useGetEnrolledEventDetailQuery(eventId);

  const registerHandler = () => {
    setIsRegisterModalOpen(true);
  };

  useEffect(() => {
    if (isSuccess) {
      setResponseMessage("Success get event detail");
    } else if (isError) {
      setResponseMessage("Failed get event detail");
    }

    if (isSuccessGetEnrolledDetail) {
      setResponseMessage("Success get enrolled event detail");
    } else if (isErrorGetEnrolledDetail) {
      setResponseMessage("Failed get enrolled event detail");
    }

    responseMessage !== "" && console.log(responseMessage);
  }, [
    isError,
    isErrorGetEnrolledDetail,
    isSuccess,
    isSuccessGetEnrolledDetail,
    responseMessage,
  ]);

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
              src={require("../../assets/example-event-poster.jpg")}
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
                {/* TODO: participant / totalQuota */}
                <span className="col-9 h5">
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
    </div>
  );
};

export default EventDetail;
