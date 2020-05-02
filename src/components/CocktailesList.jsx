import React from "react";
import Cocktail from "./Cocktail";
import styled from "styled-components";

const StyleCocktailsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
`;

const StyleCocktailsListItem = styled.div`
  width: 25%;
  margin-bottom: 30px;
`;

const CocktailesList = (props) => {
  const { cocktails } = props;

  return (
    <StyleCocktailsList>
      {cocktails.map((cocktail) => (
        <StyleCocktailsListItem key={cocktail.id}>
          <Cocktail cocktail={cocktail} />
        </StyleCocktailsListItem>
      ))}
    </StyleCocktailsList>
  );
};

export default CocktailesList;
