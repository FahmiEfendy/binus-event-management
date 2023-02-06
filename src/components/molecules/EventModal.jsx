import moment from "moment";
import { Buffer } from "buffer";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";

import { eventOptions } from "../../constants/option";
import { getPenyelenggaraId } from "../../utils/storage";
import { DateForm, FileInput, SelectForm, TextForm } from "../forms";
import { useGetPenyelenggaraDetailQuery } from "../../api/authPenyelenggaraApi";
import {
  useGetEventDetailQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useUpdateEventImageMutation,
} from "../../api/eventApi";

const EventModal = ({ editId, isOpen, setIsOpen, setEditId }) => {
  const [file, setFile] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [acceptedFile, setAcceptedFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const { data, isSuccess, isError } = useGetEventDetailQuery(editId, {
    refetchOnMountOrArgChange: true,
    skip: !editId,
  });

  const {
    data: penyelenggaraData,
    isSuccess: isSuccessGetPenyelenggara,
    isError: isErrorGetPenyelenggara,
  } = useGetPenyelenggaraDetailQuery(getPenyelenggaraId());

  const [createEvent, { isSuccess: isSuccessCreate }] = useCreateEventMutation({
    fixedCacheKey: "createEvent",
  });

  const [updateEvent, { isSuccess: isSuccessUpdate }] = useUpdateEventMutation({
    fixedCacheKey: "updateEvent",
  });

  const [updateImageEvent, { isSuccess: isSuccessUpdateImg }] =
    useUpdateEventImageMutation({ fixedCacheKey: "updateImageEvent" });

  const { handleSubmit, control, reset, setValue } = useForm();

  const closeModalHandler = useCallback(() => {
    setIsOpen(false);
    setShowPopUp(false);
    setEditId(null);
    setFile(null);
  }, [setIsOpen, setEditId]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      organizer: penyelenggaraData?.organizationName,
    };

    if (editId === null) {
      await createEvent(payload);
    } else if (editId !== null) {
      await updateEvent({ id: editId, payload });
    }

    if (acceptedFile !== null) {
      let formData = new FormData();
      formData.append("image", acceptedFile);
      formData.append("eventId", editId);

      await updateImageEvent(formData);
    }

    setShowPopUp(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setResponseMessage("Success Get Event Detail");
    } else if (isError) {
      setResponseMessage("Failed get event detail");
    }

    if (isSuccessGetPenyelenggara) {
      setResponseMessage("Success Get Penyelenggara Detail");
    } else if (isErrorGetPenyelenggara) {
      setResponseMessage("Failed Get Penyelenggara Detail");
    }

    console.log(responseMessage);
  }, [
    isError,
    isErrorGetPenyelenggara,
    isSuccess,
    isSuccessGetPenyelenggara,
    responseMessage,
  ]);

  useEffect(() => {
    if (isSuccessCreate || isSuccessUpdate || isSuccessUpdateImg) {
      closeModalHandler();
      reset();
    }
  }, [
    closeModalHandler,
    isSuccessCreate,
    isSuccessUpdate,
    isSuccessUpdateImg,
    reset,
  ]);

  useEffect(() => {
    if (editId !== null) {
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
  }, [
    data?.description,
    data?.endDate,
    data?.eventType,
    data?.location,
    data?.price,
    data?.startDate,
    data?.title,
    data?.totalQuota,
    editId,
    reset,
    setValue,
  ]);

  useEffect(() => {
    if (data?.image != null) {
      const buffertoB64 = Buffer.from(data?.image.data.data).toString("base64");
      const formattedB64 = `data:image/png;base64,${buffertoB64}`;
      setFile(formattedB64);
    }
  }, [data?.image]);

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
                <button
                  type="button"
                  className="btn px-5 py-2 mx-4 btn-primary"
                  onClick={() => setShowPopUp(true)}
                >
                  {editId !== null ? "Update" : "Add"} Event
                </button>
                {showPopUp && (
                  <div className="shadow-bg">
                    <div
                      style={{
                        backgroundColor: "white",
                        position: "absolute",
                        width: "450px",
                        height: "180px",
                        top: "20%",
                        left: "25%",
                        zIndex: "10",
                      }}
                      className="border rounded p-3"
                    >
                      <div className="d-flex">
                        <h5>{editId !== null ? "Update" : "Add"} Event</h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={() => setShowPopUp(false)}
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                        />
                      </div>
                      <p className="my-3">
                        Are you really sure you want to{" "}
                        {editId !== null ? "Update" : "Add"} it?
                      </p>
                      <div className="text-end">
                        <button
                          className="btn btn-light px-3 py-2 ms-auto me-3 mt-3"
                          onClick={() => setShowPopUp(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success px-3 py-2 mt-3"
                          type="submit"
                        >
                          {editId !== null ? "Update" : "Add"} Event
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EventModal;
