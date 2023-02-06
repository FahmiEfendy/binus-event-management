import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextForm } from "../../forms";
import { setToken, setPenyelenggaraId } from "../../../utils/storage";
import { usePenyelenggaraLoginMutation } from "../../../api/authPenyelenggaraApi";
import { ToastNotif } from "../../atoms";

const styles = {
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100vh",
  },
};

const LoginPenyelenggara = ({ setIsLogin }) => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [penyelenggaraLogin, { data, isSuccess, isError }] =
    usePenyelenggaraLoginMutation({ fixedCacheKey: "loginPenyelenggara" });

  const { handleSubmit, control } = useForm();

  const navigate = useNavigate();

  const closeToastHandler = () => {
    setIsToastOpen(false);
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
    };

    await penyelenggaraLogin(payload);
  };

  useEffect(() => {
    if (data?.token && JSON.stringify(data?.token) !== "{}") {
      setToken(data?.token);
      setPenyelenggaraId(data?.penyelenggara._id);
    }
  }, [data?.penyelenggara._id, data?.token]);

  useEffect(() => {
    if (isSuccess) {
      setResponseMessage("Login success");
      setIsLogin(true);
      navigate("/penyelenggara/");
    } else if (isError) {
      setResponseMessage("Login failed!");
    }

    if (isSuccess || isError) {
      setIsToastOpen(true);
    }
  }, [isError, isSuccess, navigate, setIsLogin]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex align-items-center mh-100 inline-block">
          <div className="w-50 bg-dark">
            <img
              src={require("../../../assets/login-image.jpg")}
              alt="Login"
              style={styles.image}
            />
          </div>
          <div className="w-50 px-5">
            <p className="h3 text-center">Binus Event Management</p>
            <p className="h3 text-center mb-4">Penyelenggara Login</p>
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
              onClick={() => navigate("/login")}
            >
              Login as Mahasiswa
            </button>
          </div>
        </div>
      </form>

      <ToastNotif
        responseMessage={responseMessage}
        isOpen={isToastOpen}
        onClose={closeToastHandler}
      />
    </>
  );
};

export default LoginPenyelenggara;
