import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TextForm } from "../forms";
import { SuccessModal, ToastNotif } from "../atoms";
import { useMahasiswaNewPasswordMutation } from "../../api/authApi";

const styles = {
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100vh",
  },
};

const NewPassword = () => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const { token } = useParams();

  const [
    mahasiswaNewPassword,
    {
      isSuccess: isSuccessMahasiswaNewPassword,
      isError: isErrorMahasiswaNewPassword,
    },
  ] = useMahasiswaNewPasswordMutation();

  const { handleSubmit, control } = useForm();

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
      token,
    };

    await mahasiswaNewPassword({ payload, token });
  };

  useEffect(() => {
    if (isSuccessMahasiswaNewPassword) {
      setIsModalOpen(true);
      setResponseMessage("Password changed successfully");
    } else if (isErrorMahasiswaNewPassword) {
      setResponseMessage("Failed to change password!");
    }

    if (isSuccessMahasiswaNewPassword || isErrorMahasiswaNewPassword) {
      setIsToastOpen(true);
    }
  }, [isErrorMahasiswaNewPassword, isSuccessMahasiswaNewPassword]);

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
            <p className="h3 text-center">Binus Event Management</p>
            <p className="h3 text-center mb-4">Change Password</p>
            <TextForm
              type="password"
              control={control}
              name="password"
              label="Password"
              isRequired
              placeholder="Enter your password..."
            />
            <TextForm
              type="password"
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              isRequired
              placeholder="Enter your confirmation password..."
            />
            <button
              type="submit"
              className="btn btn-lg btn-primary w-100 py-2 mt-3"
            >
              Save Changes
            </button>
            <div className="d-flex flex-column mt-3">
              <button className="btn btn-lg grey-color">
                <span
                  style={{ cursor: "pointer" }}
                  className="link-click"
                  onClick={goToLoginPage}
                >
                  Cancel
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
        title="Password Changed!"
        body="Your password has been changed successfully."
      />
    </>
  );
};

export default NewPassword;
