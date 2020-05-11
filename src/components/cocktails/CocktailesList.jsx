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
  margin: 0 10px 40px 10px;
`;

const CocktailesList = (props) => {
  const {
    cocktails,
    isFavoriteModeOn,
    onFavoriteCocktailClick,
    favoriteCocktails,
  } = props;

  const handleFavoriteCocktailClick = (cocktail) => {
    if (onFavoriteCocktailClick) {
      onFavoriteCocktailClick(cocktail);
    }
  };

  return (
    <StyledCocktailsList>
      {cocktails.map((cocktail) => (
        <StyleCocktailsListItem key={cocktail.id}>
          {!isFavoriteModeOn && (
            <Link to={`/cocktails/${cocktail.id}`}>
              <Cocktail
                cocktail={cocktail}
                isFavoriteModeOn={isFavoriteModeOn}
              />
            </Link>
          )}
          {isFavoriteModeOn && (
            <div onClick={() => handleFavoriteCocktailClick(cocktail)}>
              <Cocktail
                cocktail={cocktail}
                isFavoriteModeOn={isFavoriteModeOn}
                isFavorite={
                  favoriteCocktails.findIndex(
                    (checkedCocktail) => checkedCocktail.id === cocktail.id
                  ) > -1
                }
              />
            </div>
          )}
        </StyleCocktailsListItem>
      ))}
    </StyledCocktailsList>
  );
};

export default CocktailesList;
