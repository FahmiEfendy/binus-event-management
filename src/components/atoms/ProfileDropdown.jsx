import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetMahasiswaDetailQuery } from "../../api/authApi";

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

const ProfileDropdown = ({ setIsLogin }) => {
  const [username, setUsername] = useState("User");
  const [responseMessage, setResponseMessage] = useState(null);

  const navigate = useNavigate();

  const goToSettingPage = () => {
    if (getMahasiswaId() !== null) {
      navigate(`/update-profile/${getMahasiswaId()}`);
    } else if (getPenyelenggaraId() !== null) {
      navigate(`/penyelenggara/update-profile/${getPenyelenggaraId()}`);
    }
  };

  const logoutHandler = () => {
    setIsLogin(false);
    if (getMahasiswaId() !== null) {
      navigate("/login");
    } else if (getPenyelenggaraId() !== null) {
      navigate("/penyelenggara/login");
    }

    clearStorage();
  };

  const { data, isSuccess, isError } = useGetMahasiswaDetailQuery(
    getMahasiswaId(),
    { skip: !getMahasiswaId() }
  );

  useEffect(() => {
    if (isSuccess) {
      setResponseMessage("Success get Mahasiswa Profile Data");
    } else if (isError) {
      setResponseMessage("Failed get Mahasiswa Profile Data");
    }
    console.log(responseMessage);
    setUsername(data?.name);
  }, [data, isError, isSuccess, responseMessage]);

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
        className="dropdown-menu me-5 mt-2" style={{transform: "translate3d(0,0,0) !important"}}
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
