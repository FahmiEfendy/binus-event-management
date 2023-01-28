import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import {
  genderOptions,
  religionOptions,
  preferenceListOptions,
} from "../../constants/option";
import { SelectForm, TextForm, CheckForm } from "../forms";
import { useMahasiswaRegistrationMutation } from "../../api/authApi";

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "black",
    padding: "3rem",
  },
  registerFormContainer: {
    width: "95vw",
    height: "fit-content",
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

  const goToLoginPage = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onSubmit = async (data) => {
    let preferenceListSubmit = [];
    for (var arr in preferenceListOptions) {
      if (preferenceListOptions[arr].status) {
        preferenceListSubmit.push(preferenceListOptions[arr].value);
      }
    }
    const payload = {
      email: data.email,
      gender: data.gender,
      name: data.name,
      nim: data.nim,
      password: data.password,
      phoneNo: data.phoneNo,
      religion: data.religion,
      preferenceList: preferenceListSubmit,
    };
    await mahasiswaRegistration(payload);
  };

  useEffect(() => {
    if (isSuccessMahasiswaRegister) {
      setResponseMessage(dataMahasiswaRegister?.message);
      goToLoginPage();
    } else if (isErrorMahasiswaRegister) {
      setResponseMessage(errorMahasiswaRegister?.data?.message[0] || "Error");
    }
    console.log(responseMessage);
  }, [
    dataMahasiswaRegister?.message,
    errorMahasiswaRegister?.data?.message,
    goToLoginPage,
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
        className="rounded px-5 py-4 m-auto d-flex flex-column"
      >
        <p className="h2 text-center my-3">
          Binus Event User Management Register
        </p>
        <div className="d-flex justify-content-between mt-3">
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
          <CheckForm
            control={control}
            name="preferenceListOptions"
            label="Preference"
            options={preferenceListOptions}
          />
        </div>
        <div className="d-flex ms-auto mt-4">
          <button
            className="btn btn-light px-5 py-2 mx-4"
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
