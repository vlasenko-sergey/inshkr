import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AuthModal from "./modals/AuthModal";

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
  position: absolute;
  right: 60px;
  background-image: url("https://www.pngfind.com/pngs/m/622-6227673_man-svg-png-icon-free-download-font-awesome.png");
  background-position: center center;
  background-size: cover;
`;

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAuthButtonClick = () => {
    setIsAuthModalOpen(true);
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
          <StyledHeaderAccount />
          {/* <div onClick={handleAuthButtonClick}>Войти</div> */}
        </StyledHeaderContent>
      </StyledHeader>
    </>
  );
};

export default Header;
