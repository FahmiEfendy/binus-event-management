import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

import { ToastNotif } from "../../atoms";
import { EventList, EventModal } from "../../molecules";
import {
  useGetEventListQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useUpdateEventImageMutation,
} from "../../../api/eventApi";

const styles = {
  container: {
    maxWidth: "110rem",
    width: "97%",
    marginTop: "2rem",
    marginBottom: "3rem",
    padding: "2rem",
  },
};

const HomePenyelenggara = ({ searchValue }) => {
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const { data: eventList } = useGetEventListQuery();

  const [
    ,
    { isSuccess: isSuccessCreate, isError: isErrorCreate, reset: resetCreate },
  ] = useCreateEventMutation({ fixedCacheKey: "createEvent" });

  const [
    ,
    { isSuccess: isSuccessUpdate, isError: isErrorUpdate, reset: resetUpdate },
  ] = useUpdateEventMutation({ fixedCacheKey: "updateEvent" });

  const [
    ,
    {
      isSuccess: isSuccessUpdateImage,
      isError: isErrorUpdateImage,
      reset: resetUpdateImage,
    },
  ] = useUpdateEventImageMutation({ fixedCacheKey: "updateImageEvent" });

  const openModalHandler = () => {
    setEditId(null);
    setIsModalOpen(true);
  };

  const toastCloseHandler = () => {
    setIsToastOpen(false);
    resetCreate();
    resetUpdate();
    resetUpdateImage();
  };

  useEffect(() => {
    if (isSuccessCreate) {
      setResponseMessage("Event created successfully");
    } else if (isErrorCreate) {
      setResponseMessage("Failed to create event!");
    }

    if (isSuccessUpdate || isSuccessUpdateImage) {
      setResponseMessage("Event updated successfully");
    } else if (isErrorUpdate || isErrorUpdateImage) {
      setResponseMessage("Failed to update event!");
    }

    if (
      isSuccessCreate ||
      isErrorCreate ||
      isSuccessUpdate ||
      isErrorUpdate ||
      isSuccessUpdateImage ||
      isErrorUpdateImage
    ) {
      setIsToastOpen(true);
    }
  }, [
    isErrorCreate,
    isErrorUpdate,
    isErrorUpdateImage,
    isSuccessCreate,
    isSuccessUpdate,
    isSuccessUpdateImage,
  ]);

  return (
    <div>
      <div
        style={styles.container}
        className="container d-flex flex-column mx-auto px-4 rounded"
      >
        <div style={{ alignSelf: "end", margin: "1rem 3rem" }}>
          <Button
            onClick={openModalHandler}
            variant="primary"
            size="md"
            style={{ padding: "0.5rem 1.5rem", marginRight: "0.5rem" }}
          >
            Add Event
          </Button>
        </div>
        <EventList
          data={eventList}
          searchValue={searchValue}
          setIsOpen={setIsModalOpen}
          setEditId={setEditId}
        />
      </div>

      <ToastNotif
        responseMessage={responseMessage}
        isOpen={isToastOpen}
        onClose={toastCloseHandler}
      />

      <EventModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        editId={editId}
      />
    </div>
  );
};

export default HomePenyelenggara;
