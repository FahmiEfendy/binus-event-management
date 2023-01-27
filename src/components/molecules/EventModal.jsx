import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";

import { eventOptions } from "../../constants/option";
import { useCreateEventMutation } from "../../api/eventApi";
import { DateForm, FileInput, SelectForm, TextForm } from "../forms";

const EventModal = ({ isOpen, setIsOpen }) => {
  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const [createEvent, { data, isSuccess, isError, error }] =
    useCreateEventMutation();

  const { handleSubmit, control } = useForm({
    // TODO : fix get data from event detail
    defaultValues: {
      organizer: "Test Organizer 1",
      title: "Test Title 1",
      description:
        "Test Description 1 Test Description 1 Test Description 1 Test Description 1 Test Description 1",
      eventType: "SAT",
      startDate: "2023-01-29",
      endDate: "2023-01-31",
      totalQuota: "50",
      location: "Jakarta",
      price: "50000",
    },
  });

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    // TODO : get organizer from penyelenggara profile name
    const payload = {
      ...data,
      organizer: "Example Organizer 1",
    };

    await createEvent(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      setResponseMessage(data?.message);
      setIsOpen(false);
    } else if (isError) {
      setResponseMessage(error);
    }
    console.log(responseMessage);
  }, [data?.message, error, isError, isSuccess, responseMessage, setIsOpen]);

  return (
    <>
      <Modal show={isOpen} onHide={closeModalHandler} centered fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
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
                  Add Event
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
