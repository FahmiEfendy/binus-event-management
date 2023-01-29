import { useEffect, useState } from "react";

import { EventList } from "../molecules";
import { getToken } from "../../utils/storage";
import { CarouselComponent, Loading } from "../atoms";
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

  const { data: eventList, isError, isSuccess } = useGetEventListQuery();

  const {
    data: recEventData,
    isSuccess: isSucessGetRecEvent,
    isLoading: isLoadingGetRecEvent,
    isError: isErrorGetRecEvent,
  } = useGetEventListQuery(getToken());

  useEffect(() => {
    if (isSuccess) {
      setResponseMessage("Success get Event List");
    } else if (isError) {
      setResponseMessage("Failed get Event List");
    }

    if (isSucessGetRecEvent) {
      setResponseMessage("Success get event recommendation");
    } else if (isErrorGetRecEvent) {
      setResponseMessage("Failed get event recommendation");
    }

    console.log(responseMessage);
  }, [
    isError,
    isErrorGetRecEvent,
    isSuccess,
    isSucessGetRecEvent,
    recEventData,
    responseMessage,
  ]);

  return (
    <div>
      <div
        style={styles.container}
        className="container d-flex flex-column mx-auto px-4 rounded"
      >
        <p className="h3 mx-auto mb-4" style={{ color: "#6643b5" }}>
          Event Recommendation for You
        </p>
        {!isLoadingGetRecEvent ? (
          <CarouselComponent data={recEventData} />
        ) : (
          <Loading />
        )}
        <EventList data={eventList} searchValue={searchValue} />
      </div>
    </div>
  );
};

export default Home;
