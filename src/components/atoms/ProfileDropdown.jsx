import { useNavigate } from "react-router-dom";

import { clearStorage, getMahasiswaId } from "../../utils/storage";

const styles = {
  profilePicture: {
    height: "50px",
    width: "50px",
  },
  dropdownMenu: {
    minWidth: "13rem",
    fontSize: "1.1rem",
    textAlign: "center",
  },
};

const ProfileDropdown = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const username = "John Doe";

  const goToSettingPage = () => {
    navigate(`/update-profile/${getMahasiswaId()}`);
  };

  const logoutHandler = () => {
    setIsLogin(false);
    clearStorage();
    navigate("/login");
  };

  return (
    <div className="dropdown">
      <div className="d-flex" data-toggle="dropdown" id="dropdownMenuButton">
        <p className="h5 my-auto mx-4">{username}</p>
        <img
          style={styles.profilePicture}
          src={require("../../assets/user-profile-picture.jpg")}
          alt="User Profile"
          className="rounded-circle me-4"
        />
      </div>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
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
