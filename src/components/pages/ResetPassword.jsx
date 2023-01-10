import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { TextForm } from "../forms";

const styles = {
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100vh",
  },
};

const ResetPassword = () => {
  const { handleSubmit, control } = useForm();

  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/login");
  };

  const onSubmit = (data) => {
    console.log(data);
    goToLoginPage();
  };

  return (
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
          <button type="submit" className="btn btn-lg btn-primary w-100 py-3">
            Save Changes
          </button>
          <div className="d-flex flex-column mt-4">
            <button className="btn btn-lg" onClick={goToLoginPage}>
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ResetPassword;
