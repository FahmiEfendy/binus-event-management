import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import AddImageBackground from '../../assets/add-image.png'

const styles = {
  input: {
    height: "180px",
    width: "180px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundImage: `url(${AddImageBackground})`,
    backgroundSize: "cover"
  },
  profilePicture: {
    width: "200px",
    height: "200px",
    borderRadius: "5px"
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
        <div style={styles.input} className="border">
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
