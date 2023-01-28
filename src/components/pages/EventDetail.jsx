import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  useGetEventDetailQuery,
  useGetEnrolledEventDetailQuery,
} from "../../api/eventApi";
import { RegisterConfirmationModal, RegistrationSuccessModal } from "../atoms";
import { useNavigate } from "react-router-dom";

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

  setTimeout(() => {
    if (
      localStorage.getItem("_loginstatus").toString() === "false" ||
      !localStorage.getItem("_loginstatus")
    ) {
      navigate("/login");
    }
  }, 100);

  const navigate = useNavigate();

  const { eventId } = useParams();

  const { data, isSuccess, isError } = useGetEventDetailQuery(eventId, {
    skip: !eventId,
  });

  const {
    data: eventEnrolledDetail,
    isSuccess: isSuccessGetEnrolledDetail,
    isError: isErrorGetEnrolledDetail,
  } = useGetEnrolledEventDetailQuery(eventId);

  const registerHandler = () => {
    setIsRegisterModalOpen(true);
    console.log(isRegisterModalOpen);
  };

  useEffect(() => {
    if (isSuccess) {
      setResponseMessage("Success get event detail");
    } else if (isError) {
      setResponseMessage("Failed get event detail");
    }
    console.log(responseMessage);
  }, [isError, isSuccess, responseMessage]);

  useEffect(() => {
    if (isSuccessGetEnrolledDetail) {
      responseMessage("Success get enrolled event detail");
    } else if (isErrorGetEnrolledDetail) {
      responseMessage("Failed get enrolled event detail");
    }

    console.log(responseMessage);
  }, [isErrorGetEnrolledDetail, isSuccessGetEnrolledDetail, responseMessage]);

  return (
    <div
      style={styles.container}
      className="container mx-auto rounded mb-5 general-style"
    >
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
            <span className="col-9 h5">{data?.title}</span>
          </div>
          <div className="row mt-3">
            <span className="col-3 h4">Organizer</span>
            <span className="col-9 h5">{data?.organizer}</span>
          </div>
          <div className="row mt-3">
            <span className="col-3 h4">Start Date</span>
            <span className="col-9 h5">
              {moment(data?.startDate).format("LL")}
            </span>
          </div>
          <div className="row mt-3">
            <span className="col-3 h4">Type</span>
            <span className="col-9 h5">{data?.eventType}</span>
          </div>
          <div className="row mt-3">
            <span className="col-3 h4">Location</span>
            <span className="col-9 h5">{data?.location}</span>
          </div>
          <div className="row mt-3">
            <span className="col-3 h4">Participant</span>
            {/* TODO: participant / totalQuota */}
            <span className="col-9 h5">{data?.totalQuota}</span>
          </div>
          <div className="row mt-3">
            <span className="col-3 h4">
              {type === "history" ? "Status" : "Price"}
            </span>
            <span className="col-9 h5">{`${
              type === "history" ? "Status" : `${data?.price}`
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
          {data?.description}
        </p>
      </div>
      {isRegisterModalOpen && (
        <RegisterConfirmationModal
          eventId={eventId}
          setIsRegisterModalOpen={setIsRegisterModalOpen}
          setIsRegistrationSuccessModalOpen={setIsRegistrationSuccessModalOpen}
        />
      )}
      {isRegistrationSuccessModalOpen && (
        <RegistrationSuccessModal
          setIsRegistrationSuccessModalOpen={setIsRegistrationSuccessModalOpen}
        />
      )}
    </div>
  );
};

export default EventDetail;
