import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { FileInput, TextForm } from "../forms";

const styles = {
  container: {
    maxWidth: "110rem",
    width: "100%",
    backgroundColor: "gray",
    marginTop: "5rem",
    padding: "3rem 6rem",
  },
};

const Setting = () => {
  const [file, setFile] = useState(null);

  const { handleSubmit, control } = useForm();

  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      profilePicture: file,
    };
    console.log(payload);
    goToHomePage();
  };

  return (
    <>
      <div style={styles.container} className="container mx-auto rounded mb-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex me-5 flex-column">
            <p className="h1 text-center my-4">Edit Profile</p>
            <div className="d-flex justify-content-between">
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
                name="fullName"
                isRequired
                label="Full Name"
                placeholder="Enter your Full Name..."
                style={{ width: "48%" }}
              />
            </div>
            <div className="d-flex">
              <div className="w-50">
                <TextForm
                  control={control}
                  name="password"
                  isRequired
                  label="Password"
                  placeholder="Enter your password..."
                  type="password"
                  style={{ width: "96%" }}
                />
                <TextForm
                  control={control}
                  name="confirmPassword"
                  isRequired
                  label="Confirm Password"
                  placeholder="Enter your confirmation password..."
                  type="password"
                  style={{ width: "96%" }}
                />
              </div>
              <FileInput
                label="Profile Picture"
                file={file}
                setFile={setFile}
              />
            </div>
            <div className="d-flex ms-auto mt-4">
              <button
                className="btn btn-light border border-primary px-5 py-2 mx-4"
                onClick={goToHomePage}
              >
                Cancel
              </button>
              <button className="btn btn-primary px-5 py-2">Register</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Setting;
