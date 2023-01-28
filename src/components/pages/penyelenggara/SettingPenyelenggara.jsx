import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getPenyelenggaraId } from "../../../utils/storage";
import { FileInput, SelectForm, TextForm } from "../../forms";
import { organizationTypeOptions } from "../../../constants/option";
import {
  useGetPenyelenggaraDetailQuery,
  useUpdatePenyelenggaraMutation,
} from "../../../api/authPenyelenggaraApi";

const styles = {
  container: {
    maxWidth: "110rem",
    width: "92%",
    marginTop: "3rem",
    padding: "2rem",
  },
};

const SettingPenyelenggara = () => {
  const [file, setFile] = useState(null);
  const [acceptedFile, setAcceptedFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const { data, isSuccess, isError } = useGetPenyelenggaraDetailQuery(
    getPenyelenggaraId()
  );

  const [
    updatePenyelenggara,
    {
      data: updateData,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
      error: errUpdate,
    },
  ] = useUpdatePenyelenggaraMutation();

  const { handleSubmit, control, setValue } = useForm({});

  const navigate = useNavigate();

  const goToHomePage = useCallback(() => {
    navigate("/penyelenggara");
  }, [navigate]);

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      organizationType: data.organizationType,
      phoneNo: data.phoneNo,
      // profilePicture: acceptedFile,
    };
    console.log(acceptedFile);
    console.log(payload);

    await updatePenyelenggara({ id: getPenyelenggaraId(), payload });
  };

  useEffect(() => {
    if (isSuccess) {
      setResponseMessage("Success Get Penyelenggara Detail");
    } else if (isError) {
      setResponseMessage("Failed Get Penyelenggara Detail");
    }

    if (isSuccessUpdate) {
      setResponseMessage(updateData?.message);
    } else if (isErrorUpdate) {
      setResponseMessage(errUpdate?.data?.message);
    }

    console.log(responseMessage);
  }, [
    errUpdate?.data?.message,
    isError,
    isErrorUpdate,
    isSuccess,
    isSuccessUpdate,
    responseMessage,
    updateData?.message,
  ]);

  useEffect(() => {
    setValue("organizationName", data?.organizationName);
    setValue("email", data?.email);
    setValue("organizationType", data?.organizationType);
    setValue("phoneNo", data?.phoneNo);
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
            <div className="d-flex justify-content-between flex-column">
              <TextForm
                control={control}
                name="organizationName"
                isDisabled
                label="Organization Name"
                placeholder="Enter your Organization Name..."
              />
              <TextForm
                control={control}
                name="email"
                isRequired
                label="Email"
                placeholder="Enter your Email"
              />
              <SelectForm
                control={control}
                name="organizationType"
                isRequired
                label="OrganizationType"
                placeholder="Enter your Organization Type..."
                options={organizationTypeOptions}
              />
              <TextForm
                control={control}
                name="phoneNo"
                isRequired
                label="Phone No"
                placeholder="Enter your Phone No"
              />
              <FileInput
                label="Organization Logo"
                file={file}
                setFile={setFile}
                setAcceptedFile={setAcceptedFile}
              />
            </div>
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

export default SettingPenyelenggara;