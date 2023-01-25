import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextForm } from "../forms";
import { setToken, setMahasiswaId } from "../../utils/storage";
import { useMahasiswaLoginMutation } from "../../api/authApi";

const styles = {
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100vh",
  },
};

const Login = ({ setIsLogin }) => {
  const [responseMessage, setResponseMessage] = useState("");

  const [
    mahasiswaLogin,
    {
      data: dataMahasiswaLogin,
      isSuccess: isSuccessMahasiswaLogin,
      isError: isErrorMahasiswaLogin,
      error: errorMahasiswaLogin,
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
      setResponseMessage(dataMahasiswaLogin?.message);
      setIsLogin(true);
      navigate("/");
    } else if (isErrorMahasiswaLogin) {
      setResponseMessage(errorMahasiswaLogin?.data?.message || "Error");
    }
    console.log(responseMessage);
  }, [
    dataMahasiswaLogin?.message,
    errorMahasiswaLogin?.data?.message,
    isErrorMahasiswaLogin,
    isSuccessMahasiswaLogin,
    navigate,
    responseMessage,
    setIsLogin,
  ]);

  return (
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
          <p className="h1 text-center">Binus Event Management</p>
          <p className="h1 text-center mb-4">User Login</p>
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
          <button type="submit" className="btn btn-lg btn-primary w-100 py-3">
            Login
          </button>
          <div className="d-flex flex-column mt-4">
            <button className="btn btn-lg mb-1" onClick={goToResetPasswordPage}>
              Forgot password?
            </button>
            <button className="btn btn-lg" onClick={goToRegisterPage}>
              Don't have account?
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
