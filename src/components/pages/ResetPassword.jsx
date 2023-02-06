import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextForm } from "../forms";
import { SuccessModal, ToastNotif } from "../atoms";
import { useMahasiswaResetPasswordMutation } from "../../api/authApi";

const styles = {
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100vh",
  },
};

const ResetPassword = () => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [
    mahasiswaResetPassword,
    {
      isSuccess: isSuccessMahasiswaResetPassword,
      isError: isErrorMahasiswaResetPassword,
    },
  ] = useMahasiswaResetPasswordMutation();

  const { handleSubmit, control, getValues } = useForm({});

  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/login");
  };

  const closeToastHandler = () => {
    setIsToastOpen(false);
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
    };

    await mahasiswaResetPassword(payload);
  };

  useEffect(() => {
    if (isSuccessMahasiswaResetPassword) {
      setResponseMessage("Reset password email request successfully");
      setIsModalOpen(true);
    } else if (isErrorMahasiswaResetPassword) {
      setResponseMessage("Failed to request reset password email!");
    }

    if (isSuccessMahasiswaResetPassword || isErrorMahasiswaResetPassword) {
      setIsToastOpen(true);
    }
  }, [isErrorMahasiswaResetPassword, isSuccessMahasiswaResetPassword]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex align-items-center mh-100 inline-block">
          <div className="w-50 bg-dark">
            <img
              src={require("../../assets/login-image.jpg")}
              alt="Reset Password"
              style={styles.image}
            />
          </div>
          <div className="w-50 px-5">
            <p className="h3 text-center mt-5">Binus Event Management</p>
            <p className="h3 text-center mb-4">Reset Password</p>
            <TextForm
              control={control}
              name="email"
              label="Email"
              isRequired
              placeholder="Enter your email..."
            />
            <button
              type="submit"
              className="btn btn-lg btn-primary w-100 py-2 mt-3"
            >
              Reset
            </button>
            <div className="d-flex flex-column mt-4 mb-5">
              <button className="btn btn-lg grey-color">
                <span
                  style={{
                    borderBottom: "1px solid #7E7E7E",
                    cursor: "pointer",
                  }}
                  className="link-click"
                  onClick={goToLoginPage}
                >
                  Back to Login
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>

      <ToastNotif
        responseMessage={responseMessage}
        isOpen={isToastOpen}
        onClose={closeToastHandler}
      />

      <SuccessModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title="Password Reset Request Sent!"
        body={`Please check your email address ${getValues(
          "email"
        )} for instructions to reset
          your password`}
      />
    </>
  );
};

export default ResetPassword;
