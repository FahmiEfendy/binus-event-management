import { useEffect, useState } from "react";

import { EventList } from "../molecules";
import { CarouselComponent } from "../atoms";
import { useGetEventListQuery } from "../../api/eventApi";
import { useNavigate } from "react-router";

const styles = {
  container: {
    maxWidth: "110rem",
    width: "97%",
    marginTop: "2rem",
    marginBottom: "3rem",
    padding: "2rem",
  },
};

const Home = () => {
  const [responseMessage, setResponseMessage] = useState("");

  const { data: eventList, error, isError, isSuccess } = useGetEventListQuery();

  const navigate = useNavigate();

  setTimeout(() => {
    if(localStorage.getItem("_loginstatus").toString()==="false" || !localStorage.getItem("_loginstatus")){
      navigate("/login");
    }
  },100)

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
        <EventList data={eventList} />
      </div>
    </div>
  );
};

export default Home;
