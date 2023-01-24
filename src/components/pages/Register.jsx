import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SelectForm, TextForm } from "../forms";
import { useMahasiswaRegistrationMutation } from "../../api/authApi";

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
  const [responseMessage, setResponseMessage] = useState("");

  const [
    mahasiswaRegistration,
    {
      data: dataMahasiswaRegister,
      isSuccess: isSuccessMahasiswaRegister,
      isError: isErrorMahasiswaRegister,
      error: errorMahasiswaRegister,
    },
  ] = useMahasiswaRegistrationMutation();

  const { handleSubmit, control } = useForm({});

  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/login");
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
    };

    await mahasiswaRegistration(payload);
  };

  const genderOptions = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];

  const religionOptions = [
    {
      value: "Islam",
      label: "Islam",
    },
    {
      value: "Kristen",
      label: "Kristen",
    },
    {
      value: "Katolik",
      label: "Katolik",
    },
    {
      value: "Hindu",
      label: "Hindu",
    },
    {
      value: "Buddha",
      label: "Buddha",
    },
    {
      value: "Kong Hu Cu",
      label: "Kong Hu Cu",
    },
  ];

  // TODO: add notificationPreference (true or false)
  // const notificationOptions = [{ value: "emailNotification", label: "Email" }];

  useEffect(() => {
    if (isSuccessMahasiswaRegister) {
      setResponseMessage(dataMahasiswaRegister?.message);
    } else if (isErrorMahasiswaRegister) {
      setResponseMessage(errorMahasiswaRegister?.data);
    }
    console.log(responseMessage);
  }, [
    dataMahasiswaRegister?.message,
    errorMahasiswaRegister,
    isErrorMahasiswaRegister,
    isSuccessMahasiswaRegister,
    responseMessage,
  ]);

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
        <p className="h1 text-center my-3">
          Binus Event User Management Register
        </p>
        <div className="d-flex justify-content-between mt-2">
          <TextForm
            control={control}
            name="email"
            isRequired
            label="Email"
            placeholder="Enter your Email..."
            style={{ width: "48%" }}
          />
          <TextForm
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
          <TextForm
            control={control}
            name="name"
            isRequired
            label="Name"
            placeholder="Enter your Name..."
            style={{ width: "48%" }}
          />
          <TextForm
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
          <TextForm
            control={control}
            name="phoneNo"
            isRequired
            label="Phone No"
            placeholder="Enter your Phone No..."
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
          {/* <CheckForm
            control={control}
            name="emailNotification"
            label="Notification Preference"
            options={notificationOptions}
          /> */}
        </div>
        <div className="d-flex ms-auto mt-4">
          <button
            className="btn btn-light border border-primary px-5 py-2 mx-4"
            onClick={goToLoginPage}
          >
            Cancel
          </button>
          <button className="btn btn-primary px-5 py-2">Register</button>
        </div>
      </div>
    </form>
  );
};

export default Register;
