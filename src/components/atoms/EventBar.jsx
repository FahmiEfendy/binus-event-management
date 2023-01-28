import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Pencil, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import { getPenyelenggaraId } from "../../utils/storage";
import { useDeleteEventMutation } from "../../api/eventApi";

const styles = {
  eventOrganizerLogo: {
    height: "40px",
    width: "60px",
    backgroundColor: "white",
  },
};

const EventBar = ({
  type,
  eventId,
  title,
  eventType,
  date,
  location,
  participant,
  price,
  status,
  setEditId,
  setIsOpen,
}) => {
  const [responseMessage, setResponseMessage] = useState("");

  const navigate = useNavigate();

  const [deleteEvent, { data, isSuccess, isError, error }] =
    useDeleteEventMutation();

  const eventDetailHandler = () => {
    navigate(`/detail/${eventId}`);
  };

  const eventHistoryDetailHandler = () => {
    navigate(`/detail/enrolled/${eventId}`);
  };

  const deleteEventHandler = async () => {
    await deleteEvent(eventId);
  };

  const updateEventHandler = () => {
    setIsOpen(true);
    setEditId(eventId);
  };

  useEffect(() => {
    if (isSuccess) {
      setResponseMessage(data?.message);
    } else if (isError) {
      setResponseMessage(error?.data?.message);
    }
    console.log(responseMessage);
  }, [
    data?.message,
    error?.data?.message,
    isError,
    isSuccess,
    responseMessage,
  ]);

  return (
    <div className="row w-100 d-flex align-items-center rounded table-list-border">
      <div className="col-3 d-flex">
        {/* TODO : img src should get from BE */}
        <img
          style={styles.eventOrganizerLogo}
          className="rounded my-auto"
          src={require("../../assets/logo-binus.png")}
          alt="Example Event Organizer Logo"
        />
        <div className="mx-3">
          <p className="my-1" style={{fontWeight:"semibold"}}>{title}</p>
          <p className="my-1">{eventType} Provided</p>
        </div>
      </div>
      <div className="col-2">{date}</div>
      <div className="col-2">{location}</div>
      <div className="col-2">{participant}</div>
      <div className="col-1">{`${
        type === "history" ? status : `${price}`
      }`}</div>
      <div className="col-2 d-flex">
        {getPenyelenggaraId() !== null && (
          <>
            <Button
              variant="light"
              className="ms-auto me-1"
              onClick={updateEventHandler}
            >
              <Pencil />
            </Button>
            <Button
              variant="danger"
              className="mx-1 btn-delete"
              onClick={deleteEventHandler}
            >
              <Trash />
            </Button>
          </>
        )}
        <button
          type="button"
          className="btn btn-primary px-4 ms-auto"
          onClick={
            type === "history" ? eventHistoryDetailHandler : eventDetailHandler
          }
        >
          Detail
        </button>
      </div>
    </div>
  );
};

export default EventBar;
