import React from "react";
import Modal from "react-modal";
import AuthService from "../../services/authService";

const authModalStyles = {
  content: {
    width: "200px",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
};

const AuthModal = (props) => {
  const { isOpen, setIsOpen } = props;

  const handleModalClose = () => {
    setIsOpen(false);
    document.documentElement.style.overflow = 'initial';
  };

  const handleModalOpen = () => {
    document.documentElement.style.overflow = 'hidden';
  };

  return (
    <Modal
      isOpen={isOpen}
      style={authModalStyles}
      onRequestClose={handleModalClose}
      onAfterOpen={handleModalOpen}
    >
      <form>
        <input type="text"/>
        <input type="text"/>
        <button onClick={()=> {
          AuthService.login('user', 'user').then((e)=>{console.log(e)}, (e) => {console.log(e)})
        }}>login</button>
      </form>
    </Modal>
  );
};

export default AuthModal;
