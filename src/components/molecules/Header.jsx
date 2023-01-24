import { Link, NavLink } from "react-router-dom";

import { ProfileDropdown } from "../atoms";

const styles = {
  container: {
    height: "12vh",
  },
  logo: {
    height: "60px",
    width: "80px",
  },
  activeLink: {
    borderBottom: "3px groove black",
    paddingBottom: ".3rem",
    color: "#000000",
    textDecoration: "none",
  },
  inactiveLink: {
    color: "#656464",
    textDecoration: "none",
    opacity: "0.9"
  },
};

const Header = ({ setIsLogin }) => {
  return (
    <div
      style={styles.container}
      className="container-fluid d-flex align-items-center px-3 general-style"
    >
      <Link to="/">
        <img
          style={styles.logo}
          className="ms-1 py-2"
          src={require("../../assets/logo-binus.png")}
          alt="Logo Binus"
        />
      </Link>
      <div className="input-group w-25 mx-4 mt-2">
        <input
          type="text"
          className="form-control disable-input-focusable-shadow"
          placeholder="Search something..."
        />
        <span className="input-group-text">
          <i className="bi bi-search"></i>
        </span>
      </div>
      <p className="h5 my-auto mx-4">
        <NavLink
          to="/"
          exact="true"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.inactiveLink
          }
        >
          Home
        </NavLink>
      </p>
      <p className="h5 my-auto mx-4">
        <NavLink
          to="/organization-list"
          exact="true"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.inactiveLink
          }
        >
          Organization List
        </NavLink>
      </p>
      <p className="h5 my-auto mx-4">
        <NavLink
          to="/event-history"
          exact="true"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.inactiveLink
          }
        >
          Event Enrolled
        </NavLink>
      </p>
      <div className="ms-auto" style={{cursor:'pointer'}}>
        <ProfileDropdown setIsLogin={setIsLogin} />
      </div>
    </div>
  );
};

export default Header;
