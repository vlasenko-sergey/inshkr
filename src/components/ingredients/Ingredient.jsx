import React from "react";
import styled from "styled-components";
import { ReactComponent as AddToFavoriteIcon } from "../../images/add_to_favorite.svg";

const StyledIngredientImageWrapper = styled.div`
  text-align: center;
  height: 250px;
  overflow: hidden;
  position: relative;
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
`;

const Ingredient = (props) => {
  const { ingredient, isFavoriteModeOn } = props;

  return (
    <StyledIngredient isFavoriteModeOn={isFavoriteModeOn}>
      {isFavoriteModeOn && (
        <StyledFavoriteModeWrapper>
          <StyledAddToFavoriteIcon>
            <AddToFavoriteIcon />
          </StyledAddToFavoriteIcon>
        </StyledFavoriteModeWrapper>
      )}
      <StyledIngredientImageWrapper>
        <StyledIngredientImage src={ingredient.imageRef} alt="" />
      </StyledIngredientImageWrapper>
      <StyledIngredientNameRu>{ingredient.nameRu}</StyledIngredientNameRu>
      <StyledIngredientNameEn>{ingredient.nameEn}</StyledIngredientNameEn>
    </StyledIngredient>
  );
};

export default Ingredient;
