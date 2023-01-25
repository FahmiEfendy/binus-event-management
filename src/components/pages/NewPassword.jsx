import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextForm } from "../forms";
import { SuccessModal } from "../atoms";
import { useMahasiswaNewPasswordMutation } from "../../api/authApi";

const styles = {
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100vh",
  },
};

const NewPassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [
    mahasiswaNewPassword,
    {
      data: dataMahasiswaNewPassword,
      isSuccess: isSuccessMahasiswaNewPassword,
      isError: isErrorMahasiswaNewPassword,
      error: errorMahasiswaNewPassword,
    },
  ] = useMahasiswaNewPasswordMutation();

  const { handleSubmit, control } = useForm();

  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/login");
  };

  const onSubmit = async (data) => {
    //TODO: add token to payload
    const payload = {
      ...data,
    };

    await mahasiswaNewPassword(payload);
  };

  useEffect(() => {
    if (isSuccessMahasiswaNewPassword) {
      // TODO: fix setResponseMessage
      // setResponseMessage(dataMahasiswaNewPassword?.message);
      setIsModalOpen(true);
      console.log(dataMahasiswaNewPassword);
    } else if (isErrorMahasiswaNewPassword) {
      setResponseMessage(errorMahasiswaNewPassword?.data?.error || "Error");
    }
    console.log(responseMessage);
  }, [
    dataMahasiswaNewPassword,
    errorMahasiswaNewPassword?.data?.error,
    isErrorMahasiswaNewPassword,
    isSuccessMahasiswaNewPassword,
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
            <p className="h1 text-center mb-4">Reset Password</p>
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
            <button type="submit" className="btn btn-lg btn-primary w-100 py-3">
              Save Changes
            </button>
            <div className="d-flex flex-column mt-4">
              <button className="btn btn-lg" onClick={goToLoginPage}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>

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
