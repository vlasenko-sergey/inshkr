import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AuthModal from "./modals/AuthModal";
import { useSelector } from "react-redux";
import AuthService from "../services/authService";

const StyledHeader = styled.div`
  height: 60px;
  background-color: #c4c4c4;
  flex-shrink: 0;
`;

const StyledHeaderContent = styled.div`
  width: 1000px;
  margin: auto;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  position: relative;
`;

const StyledHeaderTitle = styled.div`
  font-size: 36px;
  line-height: 47px;
  font-family: "Peralta", cursive;
  position: absolute;
  left: 60px;
`;

const StyledHeaderMenu = styled.div`
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  letter-spacing: 0.2em;
  display: flex;
  text-transform: uppercase;
  align-items: center;
`;

const StyledHeaderMenuDivider = styled.div`
  height: 60px;
  width: 2px;
  background-color: #000;
  margin: 0 20px;
`;

const StyledHeaderAccount = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #797979;
  background-image: url("https://cdn4.iconfinder.com/data/icons/esophageal-esophagus-throat-cancer/255/esophageal-cancer-007-512.png");
  background-position: -5px 4px;
  background-size: cover;
`;

const StyledAuthButton = styled.button`
  background: none;
  outline: none;
  padding: 0;
  box-shadow: none;
  border: none;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  cursor: pointer;
  display: block;
  margin-left: 10px;
`;

const StyledAuthBlock = styled.div`
  display: flex;
  position: absolute;
  right: 60px;
  align-items: center;
`;

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const user = useSelector((state) => state.user);

  const handleAuthButtonClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleLogoutButtonClick = () => {
    AuthService.logout();
  };

  return (
    <>
      <AuthModal isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen} />
      <StyledHeader>
        <StyledHeaderContent>
          <StyledHeaderTitle>
            <Link to="/">InShKR</Link>
          </StyledHeaderTitle>
          <StyledHeaderMenu>
            <Link to="/cocktails">Коктейли</Link>
            <StyledHeaderMenuDivider />
            <Link to="/ingredients">Ингредиенты</Link>
          </StyledHeaderMenu>
          {user.item && (
            <StyledAuthBlock>
              <StyledHeaderAccount />
              <StyledAuthButton onClick={handleLogoutButtonClick}>
                Выйти
              </StyledAuthButton>
            </StyledAuthBlock>
          )}
          {!user.item && user.notAuthed && (
            <StyledAuthBlock>
              <StyledAuthButton onClick={handleAuthButtonClick}>
                Войти
              </StyledAuthButton>
            </StyledAuthBlock>
          )}
        </StyledHeaderContent>
      </StyledHeader>
    </>
  );
};

export default Header;
