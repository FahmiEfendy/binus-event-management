import { Toast, ToastContainer } from "react-bootstrap";

const ToastNotif = ({ responseMessage, isOpen, onClose }) => {
  return (
    <ToastContainer className="m-5" position="bottom-start">
      <Toast onClose={onClose} show={isOpen} delay={2000} bg="dark" autohide>
        <Toast.Body className={"text-white"}>{responseMessage}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotif;
