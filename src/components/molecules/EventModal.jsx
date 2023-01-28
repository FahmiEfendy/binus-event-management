import moment from "moment";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";

import { eventOptions } from "../../constants/option";
import { DateForm, FileInput, SelectForm, TextForm } from "../forms";
import {
  useGetEventDetailQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
} from "../../api/eventApi";

const EventModal = ({ editId, isOpen, setIsOpen }) => {
  const [file, setFile] = useState(null);
  const [acceptedFile, setAcceptedFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const { data, isSuccess, isError } = useGetEventDetailQuery(editId, {
    refetchOnMountOrArgChange: true,
    skip: !editId,
  });

  const [
    createEvent,
    {
      data: createData,
      isSuccess: isSuccessCreate,
      isError: isErrorCreate,
      error: errCreate,
    },
  ] = useCreateEventMutation();

  const [
    updateEvent,
    {
      data: updateData,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
      error: errUpdate,
    },
  ] = useUpdateEventMutation();

  const { handleSubmit, control, reset, setValue } = useForm();

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    // TODO : get organizer from penyelenggara profile name
    const payload = {
      ...data,
      organizer: "Example Organizer 1",
    };
    console.log(acceptedFile);

    if (editId === null) {
      await createEvent(payload);
    } else if (editId !== null) {
      await updateEvent({ id: editId, payload });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setResponseMessage("Success Get Event Detail");
    } else if (isError) {
      setResponseMessage("Failed get event detail");
    }

    if (isSuccessCreate) {
      setResponseMessage(createData?.message);
      reset();
      setIsOpen(false);
    } else if (isErrorCreate) {
      setResponseMessage(errCreate);
    }

    if (isSuccessUpdate) {
      setResponseMessage(updateData?.message);
      reset();
      setIsOpen(false);
    } else if (isErrorUpdate) {
      setResponseMessage(errUpdate);
    }

    console.log(responseMessage);
  }, [
    createData?.message,
    errCreate,
    errUpdate,
    isError,
    isErrorCreate,
    isErrorUpdate,
    isSuccess,
    isSuccessCreate,
    isSuccessUpdate,
    reset,
    responseMessage,
    setIsOpen,
    updateData?.message,
  ]);

  useEffect(() => {
    if (editId !== null) {
      // TODO : get image
      setValue("title", data?.title);
      setValue("description", data?.description);
      setValue("eventType", data?.eventType);
      setValue("startDate", moment(data?.startDate).format("YYYY-MM-DD"));
      setValue("endDate", moment(data?.endDate).format("YYYY-MM-DD"));
      setValue("totalQuota", data?.totalQuota);
      setValue("location", data?.location);
      setValue("price", data?.price);
    } else {
      reset();
    }
  }, [data, editId, reset, setValue]);

  return (
    <>
      <Modal show={isOpen} onHide={closeModalHandler} centered fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>{editId !== null ? "Update" : "Add"} Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "100%" }}>
                  <TextForm
                    control={control}
                    name="title"
                    isRequired
                    label="Title"
                    placeholder="Enter your Title..."
                    style={{ width: "96%" }}
                  />
                  <TextForm
                    control={control}
                    name="description"
                    isRequired
                    label="Description"
                    placeholder="Enter your Description..."
                    style={{ width: "96%" }}
                  />
                  <SelectForm
                    control={control}
                    name="eventType"
                    isRequired
                    label="Jenis Event"
                    placeholder="Select your Jenis Event..."
                    options={eventOptions}
                    style={{ width: "96%" }}
                  />
                  <div style={{ marginTop: "1rem" }}>
                    <FileInput
                      label="Event Image"
                      file={file}
                      setFile={setFile}
                      setAcceptedFile={setAcceptedFile}
                    />
                  </div>
                </div>
                <div style={{ width: "100%" }}>
                  <DateForm
                    control={control}
                    name="startDate"
                    isRequired
                    label="Start Date"
                    placeholder="Enter your Start Date..."
                  />
                  <DateForm
                    control={control}
                    name="endDate"
                    isRequired
                    label="End Date"
                    placeholder="Enter your End Date..."
                  />
                  <TextForm
                    control={control}
                    name="totalQuota"
                    isRequired
                    label="Total Quota"
                    placeholder="Enter your Total Quota..."
                  />
                  <TextForm
                    control={control}
                    name="location"
                    isRequired
                    label="Location"
                    placeholder="Enter your Location..."
                  />
                  <TextForm
                    control={control}
                    name="price"
                    isRequired
                    label="Price"
                    placeholder="Enter your Price..."
                  />
                </div>
              </div>
              <div className="d-flex ms-auto mt-4">
                <button
                  type="button"
                  className="btn btn-light px-5 py-2 mx-4"
                  onClick={closeModalHandler}
                >
                  Cancel
                </button>
                <button className="btn btn-primary px-5 py-2" type="submit">
                  {editId !== null ? "Update" : "Add"} Event
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EventModal;
