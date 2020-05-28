import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import AuthService from "../../services/authService";
import { useFormik } from "formik";

const authModalStyles = {
  content: {
    right: "unset",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    bottom: "unset",
  },
  overlay: {
    "z-index": "999"
  }
};

const StyledButton = styled.div`
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledAuthModeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const StyledInput = styled.input`
  display: block;
  margin-bottom: 10px;
  width: 100%;
  height: 42px;
  line-height: 1.25;
  color: #495057;
  background-color: #fff;
  background-image: none;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 10px;
  font-size: 16px;
  outline: none;
`;

const AuthModal = (props) => {
  const { isOpen, setIsOpen } = props;
  const [authMode, setAuthMode] = useState("login");

  const loginFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      AuthService.login(values.username, values.password);
    },
  });

  const registrationFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirm: "",
    },
    onSubmit: (values) => {
      AuthService.registration(
        values.username,
        values.password,
        values.passwordConfirm
      );
    },
  });

  const handleModalClose = () => {
    setIsOpen(false);
    document.documentElement.style.overflow = "initial";
  };

  const handleModalOpen = () => {
    document.documentElement.style.overflow = "hidden";
  };

  const handleLoginButtonClick = () => {
    loginFormik.handleSubmit();
  };

  const handleRegistrationButtonClick = () => {
    registrationFormik.handleSubmit();
  };

  return (
    <Modal
      isOpen={isOpen}
      style={authModalStyles}
      onRequestClose={handleModalClose}
      onAfterOpen={handleModalOpen}
    >
      {authMode === "login" && (
        <div>
          <StyledInput
            type="text"
            value={loginFormik.values.username}
            onChange={loginFormik.handleChange("username")}
            placeholder="Логин"
          />
          <StyledInput
            type="text"
            value={loginFormik.values.password}
            onChange={loginFormik.handleChange("password")}
            placeholder="Пароль"
          />
          <StyledButton onClick={handleLoginButtonClick}>Войти</StyledButton>
        </div>
      )}
      {authMode === "registration" && (
        <div>
          <StyledInput
            type="text"
            value={registrationFormik.values.username}
            onChange={registrationFormik.handleChange("username")}
            placeholder="Логин"
          />
          <StyledInput
            type="text"
            value={registrationFormik.values.password}
            onChange={registrationFormik.handleChange("password")}
            placeholder="Пароль"
          />
          <StyledInput
            type="text"
            value={registrationFormik.values.passwordConfirm}
            onChange={registrationFormik.handleChange("passwordConfirm")}
            placeholder="Повторите пароль"
          />
          <StyledButton onClick={handleRegistrationButtonClick}>
            Зарегистрироваться
          </StyledButton>
        </div>
      )}
      {authMode === "login" && (
        <div>
          Ещё нет аккаунта?{" "}
          <StyledAuthModeLink onClick={() => setAuthMode("registration")}>
            Зарегистрируйтесь
          </StyledAuthModeLink>
        </div>
      )}
      {authMode === "registration" && (
        <div>
          Уже зарегистрированы?{" "}
          <StyledAuthModeLink onClick={() => setAuthMode("login")}>
            Войдите
          </StyledAuthModeLink>
        </div>
      )}
    </Modal>
  );
};

export default AuthModal;
