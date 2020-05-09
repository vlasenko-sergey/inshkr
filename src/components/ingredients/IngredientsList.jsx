import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Ingredient from "./Ingredient";

const StyledIngredientsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const StyleIngredientsListItem = styled.div`
  width: calc(25% - 20px);
  margin: 0 10px 40px 10px;
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

const IngredientsList = (props) => {
  const { ingredients, isAddButtonShown } = props;

  const [isFavoriteModeOn, setIsFavoriteModeOn] = useState(false);

  const handleAddButtonClick = (event) => {
    setIsFavoriteModeOn(true);
  };

  return (
    <StyledIngredientsList>
      {isAddButtonShown && !isFavoriteModeOn && (
        <StyledAddFavoriteButton onClick={handleAddButtonClick}>
          <StyledAddFavoriteButtonIconWrapper>
            <StyledAddFavoriteButtonIcon>+</StyledAddFavoriteButtonIcon>
          </StyledAddFavoriteButtonIconWrapper>
          <StyledAddFavoriteButtonText>Новый</StyledAddFavoriteButtonText>
        </StyledAddFavoriteButton>
      )}
      {ingredients.map((ingredient) => (
        <StyleIngredientsListItem key={ingredient.id}>
          <Link to={`/ingredients/${ingredient.id}`}>
            <Ingredient
              isFavoriteModeOn={isFavoriteModeOn}
              ingredient={ingredient}
            />
          </Link>
        </StyleIngredientsListItem>
      ))}
    </StyledIngredientsList>
  );
};

export default IngredientsList;
