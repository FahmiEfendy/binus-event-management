import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const ResetPasswordSuccessModal = ({ body, isOpen, setIsOpen, title }) => {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <Modal size="lg" show={isOpen} centered>
      <Modal.Header style={{ padding: "1.5rem 2rem" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1.5rem 2rem",
        }}
      >
        <img
          src={require("../../assets/success-vector.png")}
          alt="Reset Password Success"
          className="img-fluid mx-5 w-50"
        />
        <p style={{ fontSize: "22px", textAlign: "center" }}>{body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button size="lg" variant="primary" onClick={goToLoginPage}>
          Go To Login Page
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResetPasswordSuccessModal;
