import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";

import { ToastNotif } from "../atoms";
import { getPenyelenggaraId } from "../../utils/storage";
import {
  useGetEventParticipantQuery,
  useDeleteEventMutation,
} from "../../api/eventApi";

const styles = {
  eventOrganizerLogo: {
    height: "40px",
    width: "60px",
    backgroundColor: "white",
  },
  list: {
    maxHeight: "30rem",
    overflow: "auto",
  },
};

const EventBar = ({
  type,
  eventId,
  title,
  eventType,
  image,
  date,
  location,
  participant,
  price,
  status,
  setEditId,
  setIsOpen,
}) => {
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [showRegistrantModal, setShowRegistrantModal] = useState(false);

  const navigate = useNavigate();

  const { data: eventParticipant } = useGetEventParticipantQuery(eventId);

  const [deleteEvent, { isSuccess, isError }] = useDeleteEventMutation({
    fixedCacheKey: "deleteEvent",
  });

  const handleViewBtnClose = () => setShowRegistrantModal(false);

  const handleDeleteBtnClose = () => setShow(false);

  const handleDeleteBtnShow = () => setShow(true);

  const eventDetailHandler = () => {
    navigate(`/detail/${eventId}`);
  };

  const eventHistoryDetailHandler = () => {
    navigate(`/detail/enrolled/${eventId}`);
  };

  const deleteEventHandler = async () => {
    if(eventParticipant!=null &&eventParticipant.length!=0){
      if(eventParticipant[0].mahasiswaList!=null && eventParticipant[0].mahasiswaList.length>0){
        setResponseMessage("You can't delete this event");
        setIsToastOpen(true)
        return
      }
    }
    await deleteEvent(eventId);
  };

  const updateEventHandler = () => {
    setIsOpen(true);
    setEditId(eventId);
  };

  const viewRegisteredEventHandler = () => {
    setShowRegistrantModal(true);
  };

  const toastCloseHandler = () => {
    setIsToastOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setShow(false);
      setResponseMessage("Event deleted successfully");
    } else if (isError) {
      setResponseMessage("Failed to delete event!");
    }

    if (isSuccess || isError) {
      setIsToastOpen(true);
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    image?.data && setFile(`data:image/png;base64,${image?.data}`);
  }, [image?.data]);

  return (
    <div className="row w-100 d-flex align-items-center rounded table-list-border">
      <div className="col-3 d-flex">
        <img
          style={styles.eventOrganizerLogo}
          className="rounded my-auto"
          src={image?.data ? file : require("../../assets/logo-binus.png")}
          alt="Example Event Organizer Logo"
        />
        <div className="mx-3">
          <p className="my-1" style={{ fontWeight: "semibold" }}>
            {title}
          </p>
          <p className="my-1">{eventType} Provided</p>
        </div>
      </div>
      <div className="col-2">{date}</div>
      <div className="col-2">{location}</div>
      <div className="col-2">
        {(eventParticipant && eventParticipant[0]?.mahasiswaList.length) || 0}
        {" / "}
        {participant}
      </div>
      <div className="col-1">{`${
        type === "history" ? status : `${price}`
      }`}</div>
      <div className="col-2 d-flex">
        {getPenyelenggaraId() !== null ? (
          <>
            <Button
              variant="light"
              className="ms-auto me-1"
              onClick={viewRegisteredEventHandler}
            >
              <Eye />
            </Button>
            <Button
              variant="light"
              className="mx-1"
              onClick={updateEventHandler}
            >
              <Pencil />
            </Button>
            <Button
              variant="danger"
              className="mx-1 btn-delete"
              onClick={handleDeleteBtnShow}
            >
              <Trash />
            </Button>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-primary px-4 ms-auto"
            onClick={
              type === "history"
                ? eventHistoryDetailHandler
                : eventDetailHandler
            }
          >
            Detail
          </button>
        )}
      </div>

      <Modal
        show={showRegistrantModal}
        onHide={handleViewBtnClose}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Participant Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul style={styles.list}>
            {eventParticipant &&
              eventParticipant[0]?.mahasiswaList?.map((data, i) => (
                <li key={i} className="py-2">
                  <h5>{data}</h5>
                </li>
              ))}
          </ul>
        </Modal.Body>
      </Modal>

      <Modal
        show={show}
        onHide={handleDeleteBtnClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you really sure you want to delete it?</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleDeleteBtnClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteEventHandler}>
            Delete Event
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastNotif
        responseMessage={responseMessage}
        isOpen={isToastOpen}
        onClose={toastCloseHandler}
      />
    </div>
  );
};

export default EventBar;
