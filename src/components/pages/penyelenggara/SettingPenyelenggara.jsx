import { Buffer } from "buffer";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Loading } from "../../atoms";
import { getPenyelenggaraId } from "../../../utils/storage";
import { FileInput, SelectForm, TextForm } from "../../forms";
import { organizationTypeOptions } from "../../../constants/option";
import {
  useGetPenyelenggaraDetailQuery,
  useUpdatePenyelenggaraMutation,
  useUpdateProfilePenyelenggaraImageMutation,
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

  const { data, isSuccess, isLoading, isError } =
    useGetPenyelenggaraDetailQuery(getPenyelenggaraId());

  const [
    updatePenyelenggara,
    {
      data: updateData,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
      error: errUpdate,
    },
  ] = useUpdatePenyelenggaraMutation();

  const [
    updateProfilePenyelenggaraImage,
    {
      data: updateDataImage,
      isSuccess: isSuccessUpdateImage,
      isError: isErrorUpdateImage,
      error: errUpdateImage,
    },
  ] = useUpdateProfilePenyelenggaraImageMutation();

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
    };

    const penyelenggaraId = getPenyelenggaraId();

    if (acceptedFile !== null) {
      let formData = new FormData();
      formData.append("image", acceptedFile);
      formData.append("penyelenggaraId", penyelenggaraId);

      await updateProfilePenyelenggaraImage(formData);
    }
    await updatePenyelenggara({ id: getPenyelenggaraId(), payload });
  };

  useEffect(() => {
    if (isSuccess) {
      setResponseMessage("Success Get Penyelenggara Detail");
    } else if (isError) {
      setResponseMessage("Failed Get Penyelenggara Detail");
    }

    if (isSuccessUpdateImage) {
      setResponseMessage(updateDataImage?.message);
    } else if (isErrorUpdateImage) {
      setResponseMessage(errUpdateImage?.data?.message || "Error");
    }

    if (isSuccessUpdate) {
      setResponseMessage(updateData?.message);
      goToHomePage();
    } else if (isErrorUpdate) {
      setResponseMessage(errUpdate?.data?.message);
    }

    console.log(responseMessage);
  }, [
    errUpdate?.data?.message,
    errUpdateImage?.data?.message,
    isError,
    isErrorUpdate,
    isSuccess,
    isSuccessUpdate,
    responseMessage,
    updateData?.message,
    goToHomePage,
    updateDataImage?.message,
    isSuccessUpdateImage,
    isErrorUpdateImage,
  ]);

  useEffect(() => {
    setValue("organizationName", data?.organizationName);
    setValue("email", data?.email);
    setValue("organizationType", data?.organizationType);
    setValue("phoneNo", data?.phoneNo);
  }, [data, setValue]);

  useEffect(() => {
    if (data?.logo) {
      const buffertoB64 = Buffer.from(data?.logo.data.data).toString("base64");
      const formattedB64 = `data:image/png;base64,${buffertoB64}`;
      setFile(formattedB64);
    }
  }, [data?.logo]);

  return (
    <>
      <div
        style={styles.container}
        className="container mx-auto rounded mb-5 general-style"
      >
        {!isLoading ? (
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
                  isDisabled
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
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default SettingPenyelenggara;
