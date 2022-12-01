import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import TextField from "./forms/TextField";

const styles = {
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100vh",
  },
};

const Login = (props) => {
  const { setIsLogin } = props;

  const { handleSubmit, control } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    setIsLogin(true);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex align-items-center mh-100 inline-block">
        <div className="w-50 bg-dark">
          <img
            src={require("../assets/login-image.jpg")}
            alt="Login"
            style={styles.image}
          />
        </div>
        <div className="w-50 px-5">
          <p className="h1 text-center">Binus Event Management</p>
          <p className="h1 text-center mb-4">User Login</p>
          <TextField
            control={control}
            name="email"
            label="Email"
            isRequired
            placeholder="Enter your email..."
          />
          <TextField
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
            <button className="btn btn-lg mb-1">Forgot password?</button>
            <button className="btn btn-lg">Don't have account?</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
