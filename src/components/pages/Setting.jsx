import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { getMahasiswaId } from "../../utils/storage";
import { FileInput, SelectForm, TextForm } from "../forms";
import { useUpdateProfileMahasiswaMutation } from "../../api/authApi";
import { genderOptions, religionOptions } from "../../constants/option";

const styles = {
  container: {
    maxWidth: "110rem",
    width: "92%",
    marginTop: "3rem",
    padding: "2rem",
  },
};

const Setting = () => {
  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const [updateProfileMahasiswa, { data, isSuccess, isError, error }] =
    useUpdateProfileMahasiswaMutation();

  const { handleSubmit, control } = useForm({
    // TODO : setValue mahasiswa detail from BE
    defaultValues: {
      name: "Fahmi Efendy",
      nim: "2301876051",
      email: "fahmi.efendy@binus.com",
      phoneNo: "0812312323",
      religion: "Kristen",
      gender: "Male",
    },
  });

  const navigate = useNavigate();

  const goToHomePage = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      // profilePicture: file,
    };

    const mahasiswaId = getMahasiswaId();

    await updateProfileMahasiswa({ id: mahasiswaId, payload });
  };

  useEffect(() => {
    if (isSuccess) {
      setResponseMessage(data?.message);
      goToHomePage();
    } else if (isError) {
      setResponseMessage(error?.data?.message || "Error");
    }
    console.log(responseMessage);
  }, [
    data?.message,
    error?.data?.message,
    goToHomePage,
    isError,
    isSuccess,
    responseMessage,
  ]);

  return (
    <>
      <div style={styles.container} className="container mx-auto rounded mb-5 general-style">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex me-5 flex-column">
            <p className="h2 text-center my-4">Edit Profile</p>
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
                name="nim"
                isRequired
                label="NIM"
                placeholder="Enter your NIM..."
                style={{ width: "48%" }}
              />
            </div>
            <div className="d-flex">
              <div className="w-50">
                <TextForm
                  control={control}
                  name="email"
                  isRequired
                  label="Email"
                  placeholder="Enter your Email..."
                  style={{ width: "96%" }}
                />
                <SelectForm
                  control={control}
                  name="religion"
                  isRequired
                  label="Religion"
                  placeholder="Select your Religion..."
                  options={religionOptions}
                  style={{ width: "96%" }}
                />
              </div>
              <div className="d-flex flex-column w-50 justify-content-between mb-4 ps-4">
                <TextForm
                  control={control}
                  name="phoneNo"
                  isRequired
                  label="Phone No"
                  placeholder="Enter your Phone No"
                />
                <SelectForm
                  control={control}
                  name="gender"
                  isRequired
                  label="Gender"
                  placeholder="Select your Gender..."
                  options={genderOptions}
                />
              </div>
            </div>
            <FileInput label="Profile Picture" file={file} setFile={setFile} />
            <div className="d-flex ms-auto mt-4">
              <button
                className="btn btn-light px-5 py-2 mx-4"
                onClick={goToHomePage}
              >
                Cancel
              </button>
              <button className="btn btn-primary px-5 py-2">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Setting;
