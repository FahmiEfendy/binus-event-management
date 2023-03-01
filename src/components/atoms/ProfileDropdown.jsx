import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetMahasiswaDetailQuery } from "../../api/authApi";
import { Buffer } from "buffer";

import Loading from "./Loading";
import {
  clearStorage,
  getMahasiswaId,
  getPenyelenggaraId,
} from "../../utils/storage";
import { useGetPenyelenggaraDetailQuery } from "../../api/authPenyelenggaraApi";

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
  const [file, setFile] = useState(null);

  const [username, setUsername] = useState("");
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
    if (getMahasiswaId() !== null) {
      navigate("/login");
    } else if (getPenyelenggaraId() !== null) {
      navigate("/penyelenggara/login");
    }
    setIsLogin(false);
    clearStorage();
  };

  const { data, isSuccess, isLoading, isError } = useGetMahasiswaDetailQuery(
    getMahasiswaId(),
    { skip: !getMahasiswaId() }
  );

  const {
    data: penyelenggaraDetail,
    isSuccess: isSuccessGetPenyelenggara,
    isLoading: isLoadingGetPenyelenggara,
    isError: isErrorGetPenyelenggara,
  } = useGetPenyelenggaraDetailQuery(getPenyelenggaraId(), {
    skip: !getPenyelenggaraId(),
  });

  useEffect(() => {
    if (isSuccess) {
      setResponseMessage("Success get Mahasiswa Profile Data");
      setUsername(data?.name);
    } else if (isError) {
      setResponseMessage("Failed get Mahasiswa Profile Data");
    }

    if (isSuccessGetPenyelenggara) {
      setResponseMessage("Success get Penyelenggara Profile Data");
      setUsername(penyelenggaraDetail?.organizationName);
    } else if (isErrorGetPenyelenggara) {
      setResponseMessage("Failed get Penyelenggara Profile Data");
    }

    console.log(responseMessage);
  }, [
    data?.name,
    isError,
    isErrorGetPenyelenggara,
    isSuccess,
    isSuccessGetPenyelenggara,
    penyelenggaraDetail?.organizationName,
    responseMessage,
  ]);

  useEffect(() => {
    if (data?.image != null) {
      const buffertoB64 = Buffer.from(data?.image.data.data).toString("base64");
      const formattedB64 = `data:image/png;base64,${buffertoB64}`;
      setFile(formattedB64);
    }
  }, [data?.image]);

  useEffect(() => {
    if (penyelenggaraDetail?.logo != null) {
      const buffertoB64 = Buffer.from(
        penyelenggaraDetail?.logo.data.data
      ).toString("base64");
      const formattedB64 = `data:image/png;base64,${buffertoB64}`;
      setFile(formattedB64);
    }
  }, [penyelenggaraDetail?.logo]);

  return (
    <div className="dropdown">
      <div className="d-flex" data-toggle="dropdown" id="dropdownMenuButton">
        <p className="h6 my-auto mx-3">{username}</p>
        {isLoading || isLoadingGetPenyelenggara ? (
          <Loading />
        ) : (data?.image != undefined && data?.image !== null) ||
          (penyelenggaraDetail?.logo != undefined &&
            penyelenggaraDetail?.logo !== null) ? (
          <img
            style={styles.profilePicture}
            src={file}
            alt="User Profile"
            className="rounded-circle me-4"
          />
        ) : (
          <img
            style={styles.profilePicture}
            src={require("../../assets/user-profile-picture.jpg")}
            alt="User Profile"
            className="rounded-circle me-4"
          />
        )}
      </div>
      <div
        className="dropdown-menu me-5 mt-2"
        style={{ transform: "translate3d(0,0,0) !important" }}
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
