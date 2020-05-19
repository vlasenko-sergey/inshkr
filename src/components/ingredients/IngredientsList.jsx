import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Ingredient from "./Ingredient";
import { useSelector } from "react-redux";

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

const StyledIngredientsListWrapper = styled.div``;

const IngredientsList = (props) => {
  const { ingredients, isAddButtonShown, isFavoriteModeOn } = props;
  const history = useHistory();
  const barIngredients = useSelector((state) => state.barIngredients.items);

  const handleAddButtonClick = (event) => {
    history.push("/ingredients?addToBarMode=true");
  };

  const getLinkByType = (type) => {
    switch (type) {
      case "Tableware":
        return "tableware";
      case "Ingredient":
        return "ingredient";
      case "Garnish":
        return "garnish";
      default:
        return "";
    }
  };

  return (
    <StyledIngredientsListWrapper>
      <StyledIngredientsList>
        {isAddButtonShown && (
          <StyledAddFavoriteButton onClick={handleAddButtonClick}>
            <StyledAddFavoriteButtonIconWrapper>
              <StyledAddFavoriteButtonIcon>+</StyledAddFavoriteButtonIcon>
            </StyledAddFavoriteButtonIconWrapper>
            <StyledAddFavoriteButtonText>Новый</StyledAddFavoriteButtonText>
          </StyledAddFavoriteButton>
        )}
        {ingredients &&
          ingredients.map((ingredient) => (
            <StyleIngredientsListItem key={`ingredient${ingredient.id}`}>
              <Link to={`/${getLinkByType(ingredient.dtype)}/${ingredient.id}`}>
                <Ingredient
                  ingredient={ingredient}
                  isFavoriteModeOn={isFavoriteModeOn}
                  isChecked={
                    barIngredients.findIndex(
                      (item) => item.id === ingredient.id
                    ) > -1
                  }
                />
              </Link>
            </StyleIngredientsListItem>
          ))}
      </StyledIngredientsList>
    </StyledIngredientsListWrapper>
  );
};

export default IngredientsList;
