import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledSpidersImage = styled.img`
  display: block;
  position: absolute;
  width: 111px;
  background-size: cover;
  z-index: 2;
  right: 0;
  bottom: 0;
  transform: translateY(102%);
  transition: all ease-in-out 0.5s;
`;

const StyledLeftWeb = styled.div`
  width: 1.5px;
  height: 19px;
  border-left: solid 0.5px #000;
  position: absolute;
  right: 44.5px;
  top: 100%;
  transition: all ease-in-out 0.5s;
`;

const StyledRightWeb = styled.div`
  width: 1.5px;
  height: 0px;
  border-right: solid 0.5px #000;
  position: absolute;
  right: 22.5px;
  top: 100%;
  transition: all ease-in-out 0.5s;
`;

const StyledLink = styled(Link)`
  display: block;
  font-size: 48px;
  line-height: 59px;
  text-transform: uppercase;
  text-align: center;
  position: relative;
  width: 300px;
  border: solid 1px #000;
  padding: 28px 0;
  width: 460px;
  margin: auto;

  ::after {
    content: "";
    position: absolute;
    display: block;
    background: white;
    top: -7px;
    height: 15px;
    width: 132px;
    left: 50%;
    z-index: 1;
    transform: translateX(-50%);
  }

  :first-child {
    margin-top: 80px;
  }

  :not(:first-child) {
    margin-top: 100px;
  }

  :hover {
    ${StyledSpidersImage} {
      transform: translateY(150%);
    }
    ${StyledLeftWeb} {
      height: 35px;
    }
    ${StyledRightWeb} {
      height: 17px;
    }
  }
`;

const StyledTopImage = styled.img`
  display: block;
  position: absolute;
  transform: translateX(-50%);
  width: 210px;
  background-size: cover;
  z-index: 2;
  left: 50%;
`;

const StyledMyBarImage = styled(StyledTopImage)`
  top: -37.4px;
  transform: translateX(-50%);
  width: 135px;
  background-size: cover;
  z-index: 2;
  left: 50%;
  top: -40.51px;
`;

const StyledFavoriteImage = styled(StyledTopImage)`
  top: -36px;
`;

const StyledRecipesImage = styled(StyledTopImage)`
  top: -62px;
`;

const StyledPartiesImage = styled(StyledTopImage)`
  top: -58px;
`;

const StyledHomePage = styled.div`
  padding-bottom: 100px;
`;

const HomeUserPage = () => {
  return (
    <StyledHomePage>
      <StyledLink to="/bar/cocktails">
        <StyledMyBarImage src="/bar.png" />
        <span>Мой бар</span>
      </StyledLink>
      <StyledLink to="/favorite">
        <StyledFavoriteImage src="/favorites.png" />
        <span>Избранное</span>
      </StyledLink>
      <StyledLink to="/my-recipes">
        <StyledRecipesImage src="/cocktails.png" />
        <span>Мои рецепты</span>
      </StyledLink>
      <StyledLink to="/parties">
        <StyledPartiesImage src="/parties.png" />
        <span>Подборки</span>
        <StyledLeftWeb />
        <StyledRightWeb />
        <StyledSpidersImage src="/spiders.png" />
      </StyledLink>
    </StyledHomePage>
  );
};

export default HomeUserPage;
