import React from "react";
import Cocktail from "./Cocktail";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

const StyledCocktailsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const StyleCocktailsListItem = styled.div`
  width: calc(25% - 20px);
  margin: 0 10px 40px 10px;
  position: relative;
`;

const StyledCocktailAmount = styled.div`
  position: absolute;
  font-weight: bold;
  font-size: ${({ amount }) =>
    !amount ? 105 : 105 / amount.toString().length}px;
  line-height: 128px;
  text-align: center;
  color: #dedede;
  z-index: 1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 11.6516px solid #dedede;
  border-radius: 50%;
  width: 124.84px;
  height: 124.84px;
  display: flex;
  justify-content: center;
  align-items: center;
  mix-blend-mode: multiply;
`;

const StyledAddFavoriteButton = styled.div`
  background-color: #fff;
  outline: none;
  padding: 0;
  border: none;
  display: flex;
  flex-direction: column;
  width: calc(25% - 20px);
  margin: 0 10px 40px 10px;
  cursor: pointer;
`;

const StyledAddFavoriteButtonIconWrapper = styled.div`
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledAddFavoriteButtonIcon = styled.div`
  width: 80px;
  height: 80px;
  border: 2px dashed #333333;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  font-size: 48px;
  line-height: 59px;
`;

const StyledAddFavoriteButtonText = styled.div`
  font-size: 18px;
  line-height: 22px;
  text-transform: uppercase;
  text-align: center;
  margin-top: 10px;
  font-weight: normal;
  text-align: center;
`;

const CocktailsList = (props) => {
  const {
    cocktails,
    isFavoriteModeOn,
    onFavoriteCocktailClick,
    favoriteCocktails,
    cocktailsAmount,
    customCocktails,
    isAddButtonShown,
  } = props;
  const history = useHistory();

  const handleAddButtonClick = (event) => {
    history.push("/my-recipes/create");
  };

  const handleFavoriteCocktailClick = (cocktail) => {
    if (onFavoriteCocktailClick) {
      onFavoriteCocktailClick(cocktail);
    }
  };

  return (
    <StyledCocktailsList>
      {isAddButtonShown && (
        <StyledAddFavoriteButton onClick={handleAddButtonClick}>
          <StyledAddFavoriteButtonIconWrapper>
            <StyledAddFavoriteButtonIcon>+</StyledAddFavoriteButtonIcon>
          </StyledAddFavoriteButtonIconWrapper>
          <StyledAddFavoriteButtonText>Новый</StyledAddFavoriteButtonText>
        </StyledAddFavoriteButton>
      )}
      {cocktails.map((cocktail) => (
        <StyleCocktailsListItem key={cocktail.id}>
          {!isFavoriteModeOn && (
            <Link
              to={
                customCocktails
                  ? `/custom-cocktails/${cocktail.id}`
                  : `/cocktails/${cocktail.id}`
              }
            >
              {cocktailsAmount && (
                <StyledCocktailAmount amount={cocktailsAmount[cocktail.id]}>
                  {cocktailsAmount[cocktail.id]}
                </StyledCocktailAmount>
              )}
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

export default CocktailsList;
