import React from "react";
import Cocktail from "./Cocktail";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledCocktailsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const StyleCocktailsListItem = styled.div`
  width: calc(25% - 20px);
  margin: 0 10px 30px 10px;
`;

const CocktailesList = (props) => {
  const { cocktails } = props;

  return (
    <StyledCocktailsList>
      {cocktails.map((cocktail) => (
        <StyleCocktailsListItem key={cocktail.id}>
          <Link to={`/cocktails/${cocktail.id}`}>
            <Cocktail cocktail={cocktail} />
          </Link>
        </StyleCocktailsListItem>
      ))}
    </StyledCocktailsList>
  );
};

export default CocktailesList;
