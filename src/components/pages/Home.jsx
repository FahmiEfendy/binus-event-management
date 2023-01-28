import { useEffect, useState } from "react";

import { EventList } from "../molecules";
import { CarouselComponent } from "../atoms";
import { useGetEventListQuery } from "../../api/eventApi";

const styles = {
  container: {
    maxWidth: "110rem",
    width: "97%",
    marginTop: "2rem",
    marginBottom: "3rem",
    padding: "2rem",
  },
};

const Home = ({ searchValue }) => {
  const [responseMessage, setResponseMessage] = useState("");

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
        <p className="h3 mx-auto mb-4" style={{ color: "#6643b5" }}>
          Recommendation for You
        </p>
        <CarouselComponent />
        <EventList data={eventList} searchValue={searchValue} />
      </div>
    </div>
  );
};

export default Home;
