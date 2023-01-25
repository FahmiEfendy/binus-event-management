import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextForm } from "../forms";
import { SuccessModal } from "../atoms";
import { useMahasiswaResetPasswordMutation } from "../../api/authApi";

const styles = {
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100vh",
  },
};

const ResetPassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [
    mahasiswaResetPassword,
    {
      data: dataMahasiswaResetPassword,
      isSuccess: isSuccessMahasiswaResetPassword,
      isError: isErrorMahasiswaResetPassword,
      error: errorMahasiswaResetPassword,
    },
  ] = useMahasiswaResetPasswordMutation();

  const { handleSubmit, control, getValues } = useForm({});

  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/login");
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
    };

    await mahasiswaResetPassword(payload);
  };

  useEffect(() => {
    if (isSuccessMahasiswaResetPassword) {
      setResponseMessage(dataMahasiswaResetPassword?.message);
      setIsModalOpen(true);
    } else if (isErrorMahasiswaResetPassword) {
      setResponseMessage(errorMahasiswaResetPassword?.data?.error || "Error");
    }
    console.log(responseMessage);
  }, [
    dataMahasiswaResetPassword?.message,
    errorMahasiswaResetPassword?.data?.error,
    isErrorMahasiswaResetPassword,
    isSuccessMahasiswaResetPassword,
    responseMessage,
  ]);

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
            <p className="h1 text-center">Binus Event Management</p>
            <p className="h text-center mb-4">Reset Password</p>
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
            <TextForm
              control={control}
              name="newPassword"
              label="New Password"
              isRequired
              placeholder="Enter your new password..."
              type="password"
            />
            <TextForm
              control={control}
              name="confirmNewpassword"
              label="Confirm New Password"
              isRequired
              placeholder="Enter your confirmation new password..."
              type="password"
            />
            <button
              type="submit"
              className="btn btn-lg btn-primary w-100 py-2 mt-3"
            >
              Save Changes
            </button>
            <div className="d-flex flex-column mt-4">
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
              <div className="d-flex flex-column mt-4">
                <button className="btn btn-lg" onClick={goToLoginPage}>
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

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
