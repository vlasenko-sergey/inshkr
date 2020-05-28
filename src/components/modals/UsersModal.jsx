import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

const authModalStyles = {
  content: {
    width: "200px",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
  overlay: {
    "z-index": "999",
  }
};

const StyledUser = styled.div`
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  padding: 20px;
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  :hover {
    background-color: #f3f3f3;
  }
`;

const StyledLabel = styled.div`
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  padding: 20px;
`;

const UsersModal = (props) => {
  const { isOpen, setIsOpen, users, onUserClick } = props;

  const handleModalClose = () => {
    setIsOpen(false);
    document.documentElement.style.overflow = "initial";
  };

  const handleModalOpen = () => {
    document.documentElement.style.overflow = "hidden";
  };

  const handleUserClick = (user) => {
    onUserClick(user);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={authModalStyles}
      onRequestClose={handleModalClose}
      onAfterOpen={handleModalOpen}
    >
      {users.length > 0 &&
        users.map((user) => (
          <StyledUser key={user.id} onClick={() => handleUserClick(user)}>
            {user.username}
          </StyledUser>
        ))}
      {users.length === 0 && (
        <StyledLabel>Нет пользователей, которых можно пригласить</StyledLabel>
      )}
    </Modal>
  );
};

export default UsersModal;
