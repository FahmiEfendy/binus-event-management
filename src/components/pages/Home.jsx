import moment from "moment";
import { useEffect, useState } from "react";

import { EventBar, CarouselComponent } from "../atoms";
import { useGetEventListQuery } from "../../api/eventApi";

const styles = {
  container: {
    maxWidth: "110rem",
    width: "97%",
    marginTop: "2rem",
    marginBottom: "3rem",
    padding: "2rem",
  },
  header: {
    fontWeight: "600",
    fontSize: "20px",
  },
};

const Home = () => {
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
      </div>
      <div
        style={styles.container}
        className="container d-flex flex-column mx-auto px-4 rounded container-general-style"
      >
        <div className="row w-100 mb-4 mx-auto px-3">
          <div className="col-3 my-auto" style={styles.header}>
            Event
          </div>
          <div className="col-2 my-auto" style={styles.header}>
            Date
          </div>
          <div className="col-2 my-auto" style={styles.header}>
            Location
          </div>
          <div className="col-2 my-auto" style={styles.header}>
            Participant
          </div>
          <div className="col-2 my-auto" style={styles.header}>
            Price
          </div>
          <div className="col-1 d-flex" style={styles.header}>
            <button type="button" className="btn btn-light px-3 d-flex">
              <i className="bi bi-funnel px-1" aria-hidden="true"></i>Filter
            </button>
          </div>
        </div>
        <div className="w-100 ms-3">
          {eventList?.eventList.map((data) => {
            return (
              <EventBar
                key={data._id}
                eventId={data._id}
                title={data.title}
                organizer={data.organizer}
                date={moment(data.startDate).format("LL")}
                location={data.location}
                // TODO: totalQuota atau jumlah yang udah ikut ?
                participant={data.totalQuota}
                price={data.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
