import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import AddImageBackground from "../../assets/add-image.png";

const styles = {
  input: {
    height: "200px",
    width: "200px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundImage: `url(${AddImageBackground})`,
    backgroundSize: "cover",
  },
  profilePicture: {
    width: "200px",
    height: "200px",
    borderRadius: "5px",
  },
};

const InputImage = ({ label, file, setFile, setAcceptedFile }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        let size = acceptedFiles[0]['size'] / (1024 * 1024)
        if (size < 2){
          setFile(event.target.result);
        } else {
          alert("Maximum File size 2 MB")
        }
      };
      reader.readAsDataURL(acceptedFiles[0]);
      setAcceptedFile(acceptedFiles[0]);
    }
  }, [acceptedFiles, setFile, setAcceptedFile]);

  return (
    <div style={styles.container}>
      <label className="mb-2 ms-2">{label}</label>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div style={styles.input} className="border">
          {acceptedFiles.length === 0 && !file ? (
            <i></i>
          ) : (
            <img style={styles.profilePicture} src={file} alt="Profile" />
          )}
        </div>
      </div>
    </div>
  );
};

export default InputImage;
