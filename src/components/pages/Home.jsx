import moment from "moment";
import { useEffect, useState } from "react";

import { EventBar } from "../atoms";
import { useGetEventListQuery } from "../../api/eventApi";

const styles = {
  container: {
    maxWidth: "110rem",
    width: "100%",
    backgroundColor: "gray",
    marginTop: "5rem",
    padding: "3rem 1rem",
  },
  header: {
    fontWeight: "600",
    fontSize: "22px",
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
    <div
      style={styles.container}
      className="container d-flex flex-column mx-auto px-4 rounded"
    >
      <div className="row w-100 mb-4">
        <div className="col-3" style={styles.header}>
          Event
        </div>
        <div className="col-2" style={styles.header}>
          Date
        </div>
        <div className="col-2" style={styles.header}>
          Location
        </div>
        <div className="col-2" style={styles.header}>
          Participant
        </div>
        <div className="col-2" style={styles.header}>
          Price
        </div>
        <div className="col-1 d-flex" style={styles.header}>
          <button type="button" className="btn btn-light px-3 mx-auto">
            <i className="bi bi-funnel px-1" aria-hidden="true"></i>Filter
          </button>
        </div>
      </div>
      {eventList?.eventList.map((data) => {
        return (
          <EventBar
            key={data._id}
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
  );
};

export default Home;
