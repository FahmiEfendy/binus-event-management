import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

import NotificationItem from "./NotificationItem";
import { ExclamationCircle } from "react-bootstrap-icons";

const styles = {
  notification: {
    display: "flex",
    flexDirection: "column",
    height: "4.8rem",
    alignItems: "center",
    color: "#6643b5",
  },
};

const Notification = ({ filteredEventList }) => {
  return (
    <Dropdown style={styles.notification} drop="down-centered">
      <Dropdown.Toggle id="notification-dropdown">
        <div
          style={{
            backgroundColor: "#6643b5",
            width: "1rem",
            marginLeft: "auto",
            borderRadius: "5px",
          }}
        >
          <h6 style={{ margin: "0", color: "white" }}>
            {filteredEventList.length}
          </h6>
        </div>
        <ExclamationCircle style={{ fontSize: "28px" }} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <h6 style={{ textAlign: "center", padding: ".6rem 0" }}>
          Upcoming Event
        </h6>
        {filteredEventList.map((data) => {
          return (
            <React.Fragment key={data._id}>
              <NotificationItem
                eventId={data._id}
                title={data.title}
                startDate={data.startDate}
                image={data.image}
              />
              <Dropdown.Divider />
            </React.Fragment>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Notification;
