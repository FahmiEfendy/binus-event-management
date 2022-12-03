import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import CheckForm from "./forms/CheckForm";
import SelectForm from "./forms/SelectForm";
import TextField from "./forms/TextField";

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "black",
  },
  registerFormContainer: {
    width: "95vw",
    height: "90vh",
    backgroundColor: "white",
  },
};

const Register = () => {
  const { handleSubmit, control } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/login");
  };

  const genderOptions = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];

  const religionOptions = [
    {
      value: "islam",
      label: "Islam",
    },
    {
      value: "krsiten",
      label: "Krsiten",
    },
    {
      value: "katolik",
      label: "Katolik",
    },
    {
      value: "hindu",
      label: "Hindu",
    },
    {
      value: "buddha",
      label: "Buddha",
    },
    {
      value: "kongHuCu",
      label: "Kong Hu Cu",
    },
  ];

  const notificationOptions = [{ value: "emailNotification", label: "Email" }];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={styles.container}
      className="d-flex"
    >
      <div
        style={styles.registerFormContainer}
        className="rounded p-5 m-auto d-flex flex-column"
      >
        <p className="h1 text-center my-4">
          Binus Event User Management Register
        </p>
        <div className="d-flex justify-content-between">
          <TextField
            control={control}
            name="email"
            isRequired
            label="Email"
            placeholder="Enter your Email..."
            style={{ width: "48%" }}
          />
          <TextField
            control={control}
            name="nim"
            isRequired
            label="NIM"
            placeholder="Enter your NIM..."
            type="number"
            style={{ width: "48%" }}
          />
        </div>
        <div className="d-flex justify-content-between">
          <TextField
            control={control}
            name="fullName"
            isRequired
            label="Full Name"
            placeholder="Enter your Full Name..."
            style={{ width: "48%" }}
          />
          <TextField
            control={control}
            name="password"
            isRequired
            label="Password"
            placeholder="Enter your password..."
            type="password"
            style={{ width: "48%" }}
          />
        </div>
        <div className="d-flex justify-content-between">
          <TextField
            control={control}
            name="phoneNumber"
            isRequired
            label="Phone Number"
            placeholder="Enter your Phone Number..."
            style={{ width: "48%" }}
          />

          <SelectForm
            control={control}
            name="religion"
            isRequired
            label="Religion"
            placeholder="Select your Religion..."
            options={religionOptions}
            style={{ width: "48%" }}
          />
        </div>
        <div className="d-flex justify-content-between">
          <SelectForm
            control={control}
            name="gender"
            isRequired
            label="Gender"
            placeholder="Select your Gender..."
            options={genderOptions}
            style={{ width: "48%" }}
          />
          <CheckForm
            control={control}
            name="emailNotification"
            label="Notification Preference"
            options={notificationOptions}
          />
        </div>
        <div className="d-flex ms-auto mt-4">
          <button className="btn btn-light border border-primary px-5 py-2 mx-4">
            Cancel
          </button>
          <button className="btn btn-primary px-5 py-2">Register</button>
        </div>
      </div>
    </form>
  );
};

export default Register;
