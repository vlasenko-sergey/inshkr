import React from "react";
import Cocktail from "./Cocktail";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyleCocktailsList = styled.div`
  display: flex;
  flex-wrap: wrap;
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
          <Link to={`/cocktails/${cocktail.id}`}>
            <Cocktail cocktail={cocktail} />
          </Link>
        </StyleCocktailsListItem>
      ))}
    </StyleCocktailsList>
  );
};

export default CocktailesList;
