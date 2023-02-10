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
  const delay = 500; // 0.5 second after user not type, API will fetch
  const [responseMessage, setResponseMessage] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(searchValue); // Delay for search event API

  const { data: eventList } = useGetEventListQuery({
    searchKeyword: debouncedValue,
  });

  const {
    data: recEventData,
    isSuccess: isSucessGetRecEvent,
    isLoading: isLoadingGetRecEvent,
    isError: isErrorGetRecEvent,
  } = useGetEventListQuery(getToken());

  useEffect(() => {
    if (isSucessGetRecEvent) {
      setResponseMessage("Success get event recommendation");
    } else if (isErrorGetRecEvent) {
      setResponseMessage("Failed get event recommendation");
    }

    console.log(responseMessage);
  }, [isErrorGetRecEvent, isSucessGetRecEvent, responseMessage]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

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
