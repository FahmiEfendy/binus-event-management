import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { EventList } from "../../molecules";
import { useGetEventListQuery } from "../../../api/eventApi";

const styles = {
  container: {
    maxWidth: "110rem",
    width: "97%",
    marginTop: "2rem",
    marginBottom: "3rem",
    padding: "2rem",
  },
};

const HomePenyelenggara = () => {
  const [responseMessage, setResponseMessage] = useState("");

  // TODO : Fix filter event list based on created event by organizer
  const { data: eventList, error, isError, isSuccess } = useGetEventListQuery();

  useEffect(() => {
    if (isSuccess) {
      setResponseMessage("Success get Event List");
    } else if (isError) {
      setResponseMessage(error);
    }
    console.log(responseMessage);
  }, [error, isError, isSuccess, responseMessage]);

  return (
    <div>
      <div
        style={styles.container}
        className="container d-flex flex-column mx-auto px-4 rounded"
      >
        <div style={{ alignSelf: "end", margin: "1rem 3rem" }}>
          <Button variant="primary" size="md" style={{padding:"0.5rem 1.5rem", marginRight:"0.5rem"}}>
            Add Event
          </Button>
        </div>
        <EventList data={eventList} />
      </div>
    </div>
  );
};

export default HomePenyelenggara;
