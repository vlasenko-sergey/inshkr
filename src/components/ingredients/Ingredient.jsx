import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as AddToFavoriteIcon } from "../../images/add_to_favorite.svg";
import { useDispatch } from "react-redux";
import {
  addIngredientToBar,
  deleteIngredientFromBar,
} from "../../features/bar/barIngredientsSlice";

const StyledIngredientImageWrapper = styled.div`
  text-align: center;
  height: 250px;
  overflow: hidden;
  position: relative;
  flex-grow: 1;
`;

const StyledIngredientImage = styled.img`
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledIngredientNameRu = styled.div`
  font-size: 18px;
  line-height: 22px;
  text-transform: uppercase;
  text-align: center;
  margin-top: 10px;
`;

const StyledIngredientNameEn = styled.div`
  font-size: 10px;
  line-height: 12px;
  text-transform: uppercase;
  text-align: center;
`;

const StyledIngredientFavoriteMode = styled.div`
  position: relative;
`;

const StyledIngredientDefault = styled.div``;

const StyledIngredient = (props) =>
  props.isFavoriteModeOn ? (
    <StyledIngredientFavoriteMode>
      {props.children}
    </StyledIngredientFavoriteMode>
  ) : (
    <StyledIngredientDefault>{props.children}</StyledIngredientDefault>
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

  ${({ active }) =>
    active &&
    `
    path {
      fill: #4AA8FF;
    }
    `}
`;

const StyledImagesWrapper = styled.div`
  display: flex;
`;

const StyledCocktailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(15% + 10px);
`;

const StyledCocktailImageWrapper = styled.div`
  height: 65.5px;
  position: relative;
  overflow: hidden;

  :not(:first-child) {
    margin-top: 10px;
  }
`;

const StyledLeftCocktails = styled.div`
  font-size: 24px;
  line-height: 29px;
  border: 1px dashed #333333;
  padding: 2px 4px;
  margin-top: 10px;
`;

const Ingredient = (props) => {
  const { ingredient, isFavoriteModeOn, isChecked } = props;
  const dispatch = useDispatch();
  const [isActive, setisActive] = useState(true);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isActive) {
      setisActive(false);
      dispatch(deleteIngredientFromBar(ingredient.id));
    } else {
      setisActive(true);
      dispatch(addIngredientToBar(ingredient.id));
    }
  };

  useEffect(() => {
    setisActive(isChecked);
  }, [isChecked]);

  return (
    <StyledIngredient isFavoriteModeOn={isFavoriteModeOn}>
      {isFavoriteModeOn && (
        <StyledFavoriteModeWrapper onClick={handleFavoriteClick}>
          <StyledAddToFavoriteIcon active={isActive}>
            <AddToFavoriteIcon />
          </StyledAddToFavoriteIcon>
        </StyledFavoriteModeWrapper>
      )}
      <StyledImagesWrapper>
        <StyledIngredientImageWrapper>
          <StyledIngredientImage src={ingredient.imageRef} alt="" />
        </StyledIngredientImageWrapper>
        {ingredient.cocktails && ingredient.cocktails.length > 0 && (
          <StyledCocktailsWrapper>
            {ingredient.cocktails.slice(0, 3).map((ingredient) => (
              <StyledCocktailImageWrapper key={ingredient.id}>
                <StyledIngredientImage src={ingredient.imageRef} alt="" />
              </StyledCocktailImageWrapper>
            ))}
            {ingredient.cocktails.length > 3 && (
              <StyledLeftCocktails>
                +{ingredient.cocktails.length - 3}
              </StyledLeftCocktails>
            )}
          </StyledCocktailsWrapper>
        )}
      </StyledImagesWrapper>
      <StyledIngredientNameRu>{ingredient.nameRu}</StyledIngredientNameRu>
      <StyledIngredientNameEn>{ingredient.nameEn}</StyledIngredientNameEn>
    </StyledIngredient>
  );
};

export default Ingredient;
