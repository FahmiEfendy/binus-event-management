import moment from "moment";
import { useEffect, useState } from "react";
import { Funnel } from "react-bootstrap-icons";
import Dropdown from "react-bootstrap/Dropdown";

import { EventBar, Loading } from "../atoms";

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

const EventList = ({ data, searchValue, setEditId, setIsOpen }) => {
  const [filterType, setFilterType] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (filterType !== "") {
      setFilteredData(
        data?.eventList.filter((data) => data.eventType === filterType)
      );
    } else {
      setFilteredData(data?.eventList);
    }

    if (searchValue.length > 0) {
      setFilteredData(
        data?.eventList.filter((data) =>
          data?.title.includes(searchValue.toLowerCase())
        )
      );
    }
  }, [data, filterType, searchValue]);

  return (
    <div
      style={styles.container}
      className="container d-flex flex-column mx-auto px-4 rounded container-general-style"
    >
      <div className="d-flex w-100 mb-4 mx-auto px-3">
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
        <div className="col-1" style={styles.header}>
          <Dropdown align="end">
            <Dropdown.Toggle id="dropdown-basic">
              <Funnel /> Filter{" "}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilterType("")} className="">
                &nbsp; &nbsp; All Types
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => setFilterType("JamSos")}
                className=""
              >
                &nbsp; &nbsp; Jam Sosial
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => setFilterType("SAT")}
                className=""
              >
                &nbsp; &nbsp; SAT
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="w-100 ms-3">
        {filteredData ? (
          filteredData?.map((data) => {
            return (
              <EventBar
                key={data._id}
                eventId={data._id}
                title={data.title}
                eventType={data.eventType}
                date={moment(data.startDate).format("LL")}
                location={data.location}
                // TODO: totalQuota atau jumlah yang udah ikut ?
                participant={data.totalQuota}
                price={data.price}
                setEditId={setEditId}
                setIsOpen={setIsOpen}
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

export default EventList;
