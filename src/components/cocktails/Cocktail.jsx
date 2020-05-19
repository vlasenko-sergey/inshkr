import React from "react";
import styled from "styled-components";
import { ReactComponent as AddToFavoriteIcon } from "../../images/add_to_favorite.svg";

const StyledCocktailImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all ease-in-out 0.3s;
`;

const StyledCocktailImageWrapper = styled.div`
  text-align: center;
  height: 250px;
  overflow: hidden;
  position: relative;
  flex-grow: 1;
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

  :hover ${StyledCocktailImage} {
    transform: translate(-50%, -50%) scale(1.5);
    filter: saturate(2);
  }
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
  width: calc(15% + 10px);
`;

const StyledIngredientImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 100%;
  max-width: 100%;
`;

const StyledIngredientImageWrapper = styled.div`
  height: 55.5px;
  position: relative;
  overflow: hidden;

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
          <StyledCocktailImage src={cocktail.imageRef} alt="" />
        </StyledCocktailImageWrapper>
        {cocktail.ingredients && (
          <StyledIngredientsWrapper>
            {cocktail.ingredients.slice(0, 3).map((ingredient) => (
              <StyledIngredientImageWrapper key={ingredient.id}>
                <StyledIngredientImage src={ingredient.imageRef} alt="" />
              </StyledIngredientImageWrapper>
            ))}
            {cocktail.ingredients.length === 4 && (
              <StyledIngredientImageWrapper>
                <StyledIngredientImage
                  src={cocktail.ingredients[3].imageRef}
                  alt=""
                />
              </StyledIngredientImageWrapper>
            )}
            {cocktail.ingredients.length > 4 && (
              <StyledLeftIngredients>
                +{cocktail.ingredients.length - 3}
              </StyledLeftIngredients>
            )}
          </StyledIngredientsWrapper>
        )}
      </StyledImagesWrapper>
      <StyledCocktailNameRu>{cocktail.nameRu}</StyledCocktailNameRu>
      <StyledCocktailNameEn>{cocktail.nameEn}</StyledCocktailNameEn>
    </StyledCocktail>
  );
};

export default Cocktail;
