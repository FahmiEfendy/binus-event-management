import { OrganizationBar } from "../atoms";
import { useNavigate } from "react-router-dom";

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

const OrganizationList = () => {

  const navigate = useNavigate();
  
  setTimeout(() => {
    if(localStorage.getItem("_loginstatus").toString()==="false" || !localStorage.getItem("_loginstatus")){
      navigate("/login");
    }
  },100)

  return (
    <div
      style={styles.container}
      className="container d-flex flex-column mx-auto px-4 rounded general-style"
    >
      <div className="row w-100 mb-4 mx-auto px-3">
        <div className="col-5" style={styles.header}>
          Organization
        </div>
        <div className="col-5" style={styles.header}>
          Type
        </div>
        <div className="col-2 d-flex" style={styles.header}>
          <button type="button" className="btn btn-light px-3 mx-auto d-flex">
            <i className="bi bi-funnel px-1" aria-hidden="true"></i>Filter
          </button>
        </div>
      </div>
      <div className="w-100 ms-3">
        <OrganizationBar />
        <OrganizationBar />
        <OrganizationBar />
      </div>
    </div>
  );
};

export default OrganizationList;
