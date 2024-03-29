import { useNavigate } from "react-router-dom";

const styles = {
  eventOrganizerLogo: {
    height: "40px",
    width: "60px",
    backgroundColor: "white",
  },
};

const OrganizationBar = () => {
  const navigate = useNavigate();

  const organizationDetailHandler = () => {
    navigate("/example-organization-path");
  };

  return (
    <div className="row w-100 d-flex align-items-center table-list-border rounded">
      <div className="col-5 d-flex">
        <img
          style={styles.eventOrganizerLogo}
          className="rounded my-auto"
          src={require("../../assets/logo-binus.png")}
          alt="Example Event Organizer Logo"
        />
        <div className="mx-3 my-auto">
          <p className="my-auto">Example Event Organizer</p>
        </div>
      </div>
      <div className="col-5">Example Event Organizer Type</div>
      <div className="col-2 d-flex">
        <button
          type="button"
          className="btn btn-primary px-4 mx-auto"
          onClick={organizationDetailHandler}
        >
          Detail
        </button>
      </div>
    </div>
  );
};

export default OrganizationBar;
