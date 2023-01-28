import { useEffect, useState } from "react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

import { EventBar, Loading } from "../atoms";
import { getToken } from "../../utils/storage";
import { useGetEnrolledEventQuery } from "../../api/eventApi";

const styles = {
  container: {
    maxWidth: "110rem",
    width: "97%",
    marginTop: "3rem",
    marginBottom: "3rem",
    padding: "2rem",
  },
  header: {
    fontWeight: "600",
    fontSize: "20px",
  },
};

const EventHistory = () => {
  const [responseMessage, setResponseMessage] = useState("");

  const {
    data: enrolledEventList,
    isSuccess,
    isError,
  } = useGetEnrolledEventQuery(getToken());

  useEffect(() => {
    if (isSuccess) {
      setResponseMessage("Success Get Enrolled Event List");
    } else if (isError) {
      setResponseMessage("Failed Get Enrolled Event List");
    }

    console.log(responseMessage);
  }, [isError, isSuccess, responseMessage]);

  return (
    <div
      style={styles.container}
      className="container d-flex flex-column mx-auto px-4 rounded general-style"
    >
      <div className="row w-100 mb-4 mx-auto px-3">
        <div className="col-3" style={styles.header}>
          Event
        </div>
        <div className="col-2" style={styles.header}>
          Start Date
        </div>
        <div className="col-2" style={styles.header}>
          Location
        </div>
        <div className="col-2" style={styles.header}>
          Participant
        </div>
        <div className="col-2" style={styles.header}>
          Status
        </div>
        <div className="col-1 d-flex" style={styles.header}>
          <button type="button" className="btn btn-light px-3 d-flex">
            <i className="bi bi-funnel px-1" aria-hidden="true"></i>Filter
          </button>
        </div>
      </div>

      <div className="w-100 ms-3">
        {enrolledEventList ? (
          enrolledEventList[0].eventEnrolled.map((data) => {
            const currDate = moment(new Date()).format("LL");
            const startDate = moment(data.startDate).format("LL");
            const endDate = moment(data.endDate).format("LL");

            let status = "";

            if (currDate < startDate) {
              status = "Upcoming";
            } else if (startDate < currDate && currDate < endDate) {
              status = "Ongoing";
            } else {
              status = "Completed";
            }

            return (
              <EventBar
                type="history"
                key={data._id}
                eventId={data._id}
                title={data.title}
                eventType={data.eventType}
                date={startDate}
                location={data.location}
                status={status}
                // TODO: totalQuota atau jumlah yang udah ikut ?
                participant={data.totalQuota}
                price={data.price}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default EventHistory;
