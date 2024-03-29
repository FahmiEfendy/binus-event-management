import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextForm } from "../forms";
import { ToastNotif } from "../atoms";
import { useMahasiswaLoginMutation } from "../../api/authApi";
import { setToken, setMahasiswaId } from "../../utils/storage";

const styles = {
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100vh",
  },
};

const Login = ({ setIsLogin }) => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [
    mahasiswaLogin,
    {
      data: dataMahasiswaLogin,
      isSuccess: isSuccessMahasiswaLogin,
      isError: isErrorMahasiswaLogin,
    },
  ] = useMahasiswaLoginMutation();

  const { handleSubmit, control } = useForm();

  const navigate = useNavigate();

  const goToRegisterPage = () => {
    navigate("/register");
  };

  const goToResetPasswordPage = () => {
    navigate("/reset-password");
  };

  const closeToastHandler = () => {
    setIsToastOpen(false);
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
    };

    await mahasiswaLogin(payload);
  };

  useEffect(() => {
    if (
      dataMahasiswaLogin?.token &&
      JSON.stringify(dataMahasiswaLogin?.token) !== "{}"
    ) {
      setToken(dataMahasiswaLogin?.token);
      setMahasiswaId(dataMahasiswaLogin?.mahasiswa._id);
    }
  }, [dataMahasiswaLogin?.mahasiswa._id, dataMahasiswaLogin?.token]);

  useEffect(() => {
    if (isSuccessMahasiswaLogin) {
      setResponseMessage("Login successfully");
      setIsLogin(true);
      navigate("/");
    } else if (isErrorMahasiswaLogin) {
      setResponseMessage("Failed to login");
    }

    if (isSuccessMahasiswaLogin || isErrorMahasiswaLogin) {
      setIsToastOpen(true);
    }
  }, [isErrorMahasiswaLogin, isSuccessMahasiswaLogin, navigate, setIsLogin]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex align-items-center mh-100 inline-block">
          <div className="w-50 bg-dark">
            <img
              src={require("../../assets/login-image.jpg")}
              alt="Login"
              style={styles.image}
            />
          </div>
          <div className="w-50 px-5">
            <p className="h3 text-center">Binus Event Management</p>
            <p className="h3 text-center mb-4">Mahasiswa Login</p>
            <TextForm
              control={control}
              name="email"
              label="Email"
              isRequired
              placeholder="Enter your email..."
            />
            <TextForm
              control={control}
              name="password"
              label="Password"
              isRequired
              placeholder="Enter your password..."
              type="password"
            />
            <button
              type="submit"
              className="btn btn-lg btn-primary w-100 py-2 mt-3"
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn-lg btn-light w-100 py-2 mt-3"
              onClick={() => navigate("/penyelenggara/login")}
            >
              Login as Penyelenggara
            </button>
            <div className="d-flex flex-column mt-4">
              <button className="btn btn-lg mb-1 grey-color">
                <span
                  style={{
                    borderBottom: "1px solid #7E7E7E",
                    cursor: "pointer",
                  }}
                  className="link-click"
                  onClick={goToResetPasswordPage}
                >
                  Forgot password?
                </span>
              </button>
              <button className="btn btn-lg grey-color">
                <span
                  style={{
                    borderBottom: "1px solid #7E7E7E",
                    cursor: "pointer",
                  }}
                  className="link-click"
                  onClick={goToRegisterPage}
                >
                  Don't have account?
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>

      <ToastNotif
        responseMessage={responseMessage}
        onClose={closeToastHandler}
        isOpen={isToastOpen}
      />
    </>
  );
};

export default Login;
