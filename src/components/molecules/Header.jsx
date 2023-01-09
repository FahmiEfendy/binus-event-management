import { Link, NavLink } from "react-router-dom";

const styles = {
  container: {
    backgroundColor: "gray",
    height: "8vh",
  },
  logo: {
    height: "60px",
    width: "80px",
  },
  profilePicture: {
    height: "50px",
    width: "50px",
  },
  activeLink: {
    borderBottom: "1px solid white",
    paddingBottom: ".3rem",
    color: "#000000",
    textDecoration: "none",
  },
  inactiveLink: {
    color: "#000000",
    textDecoration: "none",
  },
};

const Header = () => {
  const username = "John Doe";

  return (
    <div
      style={styles.container}
      className="container-fluid d-flex align-items-center"
    >
      <Link to="/">
        <img
          style={styles.logo}
          className="ms-4 py-2"
          src={require("../../assets/logo-binus.png")}
          alt="Logo Binus"
        />
      </Link>
      <div className="input-group w-25 mx-4">
        <input
          type="text"
          className="form-control"
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
          Event History
        </NavLink>
      </p>
      <div className="ms-auto d-flex">
        <p className="h5 my-auto mx-4">{username}</p>
        <img
          style={styles.profilePicture}
          src={require("../../assets/user-profile-picture.jpg")}
          alt="User Profile"
          className="rounded-circle me-4"
        />
      </div>
    </div>
  );
};

export default Header;
