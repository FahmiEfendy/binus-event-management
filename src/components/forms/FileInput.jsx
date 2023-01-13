import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

const styles = {
  container: {
    margin: "0rem 2rem",
  },
  input: {
    height: "180px",
    width: "180px",
    backgroundColor: "#FFFFFF",
    borderRadius: "5px",
  },
  profilePicture: {
    width: "200px",
    height: "200px",
  },
};

const InputImage = ({ label, file, setFile }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFile(event.target.result);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, [acceptedFiles, setFile]);

  return (
    <div style={styles.container}>
      <label className="mb-2 ms-2">{label}</label>
      <div {...getRootProps({ className: "dropzone" })}>
        <div style={styles.input}>
          {acceptedFiles.length === 0 ? (
            <input {...getInputProps()} />
          ) : (
            <img style={styles.profilePicture} src={file} alt="Profile" />
          )}
        </div>
      </div>
    </div>
  );
};

export default InputImage;
