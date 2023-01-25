import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetEventDetailQuery } from "../../api/eventApi";
import { RegisterConfirmationModal, RegistrationSuccessModal } from "../atoms";

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

const EventDetail = ({ type }) => {
  const [responseMessage, setResponseMessage] = useState("");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isRegistrationSuccessModalOpen, setIsRegistrationSuccessModalOpen] =
    useState(false);

  const { eventId } = useParams();

  const { data, isSuccess, isError } = useGetEventDetailQuery(eventId);

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

  return (
    <div style={styles.container} className="container mx-auto rounded mb-5">
      <div className="d-flex me-5">
        <img
          style={styles.eventPoster}
          src={require("../../assets/example-event-poster.jpg")}
          alt="Example Event Poster"
          className="img-fluid me-5"
        />
        <div
          className="d-flex flex-column justify-content-around mx-5"
          style={styles.eventDetail}
        >
          <div className="row">
            <span className="col-3 h4">Title</span>
            <span className="col-9 h3">{data?.title}</span>
          </div>
          <div className="row">
            <span className="col-3 h4">Organizer</span>
            <span className="col-9 h3">{data?.organizer}</span>
          </div>
          <div className="row">
            <span className="col-3 h4">Date</span>
            <span className="col-9 h3">
              {moment(data?.startDate).format("LL")}
            </span>
          </div>
          <div className="row">
            <span className="col-3 h4">Type</span>
            <span className="col-9 h3">{data?.eventType}</span>
          </div>
          <div className="row">
            <span className="col-3 h4">Location</span>
            <span className="col-9 h3">{data?.location}</span>
          </div>
          <div className="row">
            <span className="col-3 h4">Participant</span>
            {/* TODO: participant / totalQuota */}
            <span className="col-9 h3">{data?.totalQuota}</span>
          </div>
          <div className="row">
            <span className="col-3 h4">
              {type === "history" ? "Status" : "Price"}
            </span>
            <span className="col-9 h3">{`${
              type === "history" ? "Status" : `${data?.price}`
            }`}</span>
          </div>
          {type === "history" ? (
            ""
          ) : (
            <div className="row">
              <button
                type="button"
                className="btn btn-primary py-2 col-12"
                data-toggle="modal"
                data-target="#registrationConfirmationModal"
                onClick={registerHandler}
              >
                <p className="h4">Register</p>
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <p className="h2 mt-5">Event Details</p>
        <p className="h6 mt-3" style={styles.eventDetailDescription}>
          {data?.description}
        </p>
      </div>
      {isRegisterModalOpen && (
        <RegisterConfirmationModal
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
