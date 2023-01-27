import { useNavigate } from "react-router-dom";

import {
  clearStorage,
  getMahasiswaId,
  getPenyelenggaraId,
} from "../../utils/storage";

const styles = {
  profilePicture: {
    height: "50px",
    width: "50px",
  },
  dropdownMenu: {
    minWidth: "13rem",
    textAlign: "center",
  },
};

const ProfileDropdown = () => {
  const navigate = useNavigate();

  const username = "John Doe";

  const goToSettingPage = () => {
    if (getMahasiswaId() !== null) {
      navigate(`/update-profile/${getMahasiswaId()}`);
    } else if (getPenyelenggaraId() !== null) {
      navigate(`/penyelenggara/update-profile/${getPenyelenggaraId()}`);
    }
  };

  const logoutHandler = () => {
    if (getMahasiswaId() !== null) {
      navigate("/login");
    } else if (getPenyelenggaraId() !== null) {
      navigate("/penyelenggara/login");
    }

    clearStorage();
  };

  return (
    <div className="dropdown">
      <div className="d-flex" data-toggle="dropdown" id="dropdownMenuButton">
        <p className="h6 my-auto mx-4">{username}</p>
        <img
          style={styles.profilePicture}
          src={require("../../assets/user-profile-picture.jpg")}
          alt="User Profile"
          className="rounded-circle me-4"
        />
      </div>
      <div
        className="dropdown-menu me-4 mt-2"
        aria-labelledby="dropdownMenuButton"
      >
        <button
          className="dropdown-item"
          style={styles.dropdownMenu}
          onClick={goToSettingPage}
        >
          Setting
        </button>
        <div className="dropdown-divider"></div>
        <button
          className="dropdown-item text-danger"
          style={styles.dropdownMenu}
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
