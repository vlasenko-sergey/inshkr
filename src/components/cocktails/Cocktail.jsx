import React from "react";
import styled from "styled-components";
import { ReactComponent as AddToFavoriteIcon } from "../../images/add_to_favorite.svg";

const StyledCocktailImageWrapper = styled.div`
  text-align: center;
  height: 250px;
  overflow: hidden;
  position: relative;
  width: 90%;
`;

const StyledCocktailImage = styled.img`
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledCocktailNameRu = styled.div`
  font-size: 18px;
  line-height: 22px;
  text-transform: uppercase;
  text-align: center;
  margin-top: 10px;
`;

const StyledCocktailNameEn = styled.div`
  font-size: 10px;
  line-height: 12px;
  text-transform: uppercase;
  text-align: center;
`;

const StyledCocktailFavoriteMode = styled.div`
  position: relative;
  cursor: pointer;
  height: 300px;
`;

const StyledCocktailDefault = styled.div`
  height: 300px;
`;

const StyledCocktail = (props) =>
  props.isFavoriteModeOn ? (
    <StyledCocktailFavoriteMode>{props.children}</StyledCocktailFavoriteMode>
  ) : (
    <StyledCocktailDefault>{props.children}</StyledCocktailDefault>
  );

const StyledFavoriteModeWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1;
`;

const StyledAddToFavoriteIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${({ checked }) =>
    checked &&
    `
    path {
      fill: #4AA8FF;
    }
    `}
`;

const StyledImagesWrapper = styled.div`
  display: flex;
`;

const StyledIngredientsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledIngredientImage = styled.img`
  height: 62.5px;

  :not(:first-child) {
    margin-top: 10px;
  }
`;

const StyledLeftIngredients = styled.div`
  font-size: 24px;
  line-height: 29px;
  border: 1px dashed #333333;
  padding: 2px 4px;
  margin-top: 10px;
`;

const Cocktail = (props) => {
  const { cocktail, isFavoriteModeOn, isFavorite } = props;

  return (
    <StyledCocktail isFavoriteModeOn={isFavoriteModeOn}>
      {isFavoriteModeOn && (
        <StyledFavoriteModeWrapper>
          <StyledAddToFavoriteIcon checked={isFavorite}>
            <AddToFavoriteIcon />
          </StyledAddToFavoriteIcon>
        </StyledFavoriteModeWrapper>
      )}
      <StyledImagesWrapper>
        <StyledCocktailImageWrapper>
          <StyledCocktailImage
            src="https://ru.inshaker.com/uploads/cocktail/hires/495/1556469311-Connaught-Martini__highres.jpg"
            alt=""
          />
        </StyledCocktailImageWrapper>
        {cocktail.recipe && <StyledIngredientsWrapper>
          {cocktail.recipe.slice(0, 3).map((ingredient) => (
            <StyledIngredientImage
              src="https://ru.inshaker.com/uploads/good/image_common/62/1587386612-WOODFORD_STRAIGHT_BOURBON_WHISKEY_460%D1%85865.jpg"
              alt=""
            />
          ))}
          {cocktail.recipe.length === 4 && (
            <StyledIngredientImage
              src="https://ru.inshaker.com/uploads/good/image_common/62/1587386612-WOODFORD_STRAIGHT_BOURBON_WHISKEY_460%D1%85865.jpg"
              alt=""
            />
          )}
          {cocktail.recipe.length > 4 && (
            <StyledLeftIngredients>
              +{cocktail.recipe.length - 3}
            </StyledLeftIngredients>
          )}
        </StyledIngredientsWrapper>}
      </StyledImagesWrapper>
      <StyledCocktailNameRu>{cocktail.nameRu}</StyledCocktailNameRu>
      <StyledCocktailNameEn>{cocktail.nameEn}</StyledCocktailNameEn>
    </StyledCocktail>
  );
};

export default Cocktail;
