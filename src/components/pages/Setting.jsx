import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { getMahasiswaId } from "../../utils/storage";
import { FileInput, SelectForm, TextForm } from "../forms";
import {
  useGetMahasiswaDetailQuery,
  useUpdateProfileImageMahasiswaMutation,
  useUpdateProfileMahasiswaMutation,
} from "../../api/authApi";
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
  const [acceptedFile, setAcceptedFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const { data, isSuccess, isError } = useGetMahasiswaDetailQuery(
    getMahasiswaId()
  );

  const [
    updateProfileMahasiswa,
    { data: updateData, isSuccessUpdate, isErrorUpdate, error: errUpdate },
  ] = useUpdateProfileMahasiswaMutation();

  const [
    updateProfileImageMahasiswa,
    { data: updateDataImage, isSuccessUpdateImage, isErrorUpdateImage, error: errUpdateImage },
  ] = useUpdateProfileImageMahasiswaMutation();

  const { handleSubmit, control, setValue } = useForm();

  const navigate = useNavigate();

  setTimeout(() => {
    if(localStorage.getItem("_loginstatus").toString()==="false" || !localStorage.getItem("_loginstatus")){
      navigate("/login");
    }
  },100)

  const goToHomePage = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      phoneNo: data.phoneNo,
      religion: data.religion,
      gender: data.gender,
      // TODO : profilePicture: file,
    };

    const mahasiswaId = getMahasiswaId();

    console.log(acceptedFile)
    if (acceptedFile!==null){
      let formData = new FormData();
      formData.append('image', acceptedFile);
      formData.append('mahasiswaId', mahasiswaId);

      console.log(formData)

      await updateProfileImageMahasiswa (formData);
    }
    await updateProfileMahasiswa({ id: mahasiswaId, payload });

  };

  useEffect(() => {
    if (isSuccess) {
      setResponseMessage("Success Get Detail Mahasiswa");
    } else if (isError) {
      setResponseMessage("Failed Get Detail Mahasiswa");
    }

    if(isSuccessUpdateImage) {
      setResponseMessage(updateDataImage?.message);
    } else if(isErrorUpdateImage) {
      setResponseMessage(errUpdateImage?.data?.message || "Error");
    }

    if (isSuccessUpdate) {
      setResponseMessage(updateData?.message);
      console.error()
      goToHomePage();
    } else if (isErrorUpdate) {
      setResponseMessage(errUpdate?.data?.message || "Error");
    }
    
    console.log(responseMessage);
  }, [errUpdate?.data?.message, errUpdateImage?.data?.message, goToHomePage, 
      isError, isErrorUpdate, isErrorUpdateImage, isSuccess, isSuccessUpdate, 
      isSuccessUpdateImage, responseMessage, updateData?.message, updateDataImage?.message]);

  useEffect(() => {
    // TODO : get image
    setValue("name", data?.name);
    setValue("nim", data?.nim);
    setValue("email", data?.email);
    setValue("religion", data?.religion);
    setValue("phoneNo", data?.phoneNo);
    setValue("gender", data?.gender);
    
    if(data?.image != null){
      // setAcceptedFile(data?.image)
      let blob = new Blob(data?.image.data.data, {type: data?.image.contentType})
      // console.log(blob)
      let reader = new FileReader()
      reader.readAsDataURL(blob)

      reader.onload = (e)=>{
          setFile(e.target.result)
          console.log(e.target.result)
      }
    }
  }, [data, setValue]);

  return (
    <>
      <div
        style={styles.container}
        className="container mx-auto rounded mb-5 general-style"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex me-5 flex-column">
            <p className="h2 text-center my-4">Edit Profile</p>
            <div className="d-flex justify-content-between">
              <TextForm
                control={control}
                name="name"
                isDisabled
                isRequired
                label="Name"
                placeholder="Enter your Name..."
                style={{ width: "48%" }}
              />
              <TextForm
                control={control}
                name="nim"
                isDisabled
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
            <FileInput label="Profile Picture" file={file} setFile={setFile} setAcceptedFile={setAcceptedFile}/>
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
