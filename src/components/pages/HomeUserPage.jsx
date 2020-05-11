import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled.div`
  font-size: 48px;
  line-height: 59px;
  text-transform: uppercase;
  text-align: center;

  :first-child {
    margin-top: 14px;
  }

  :not(:first-child) {
    margin-top: 100px;
  }
`;

const HomeUserPage = () => {
  return (
    <div>
      <StyledLink>
        <Link to="/bar">Мой бар</Link>
      </StyledLink>
      <StyledLink>
        <Link to="/favorite">Избранное</Link>
      </StyledLink>
      <StyledLink>
        <Link to="/my-recipes">Мои рецепты</Link>
      </StyledLink>
      <StyledLink>
        <Link to="/parties">Подборки</Link>
      </StyledLink>
    </div>
  );
};

export default HomeUserPage;
