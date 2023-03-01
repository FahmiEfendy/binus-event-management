import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";

const styles = {
  eventPoster: {
    height: "40px",
    width: "60px",
  },
};

const NotificationItem = ({ title, startDate, image, eventId }) => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const eventDetailHandler = () => {
    navigate(`/detail/enrolled/${eventId}`);
  };

  useEffect(() => {
    image?.data && setFile(`data:image/png;base64,${image?.data}`);
  }, [image?.data]);

  return (
    <Dropdown.Item
      style={{
        margin: "0 1rem",
        width: "20rem",
        height: "5.5rem",
        display: "flex",
        alignItems: "center",
      }}
      onClick={eventDetailHandler}
    >
      <div className="me-3">
        <img
          className="rounded my-auto"
          style={styles.eventPoster}
          src={image?.data ? file : require("../../assets/logo-binus.png")}
          alt={`${title} Logo`}
        />
      </div>
      <div>
        <h6>{title}</h6>
        <p className="m-0">{moment(startDate).format("LL")}</p>
      </div>
    </Dropdown.Item>
  );
};

export default NotificationItem;
