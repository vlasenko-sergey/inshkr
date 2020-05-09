import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import { BarIngredientsPage } from "./BarIngredientsPage";
import BarCocktailsPage from "./BarCocktailsPage";
import styled from "styled-components";

const StyledBarPageLinksWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledBarPageLink = styled(Link)`
  font-size: 24px;
  line-height: 29px;
  text-decoration-line: underline;
  text-transform: uppercase;

  :first-child {
    margin-right: 40px;
  }
`;

const BarPage = () => {
  return (
    <div>
      <h1>Мой бар</h1>
      <StyledBarPageLinksWrapper>
        <StyledBarPageLink to="/bar/cocktails">Коктейли</StyledBarPageLink>
        <StyledBarPageLink to="/bar/ingredients">Ингредиенты</StyledBarPageLink>
      </StyledBarPageLinksWrapper>
      <Switch>
        <Route exact path="/bar/ingredients">
          <BarIngredientsPage />
        </Route>
        <Route exact path="/bar/cocktails">
          <BarCocktailsPage />
        </Route>
      </Switch>
    </div>
  );
};

export default BarPage;
