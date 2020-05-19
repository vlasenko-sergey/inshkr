import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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

const StyledIngredientCategoryName = styled.div`
  font-size: 18px;
  line-height: 22px;
  text-transform: uppercase;
  text-align: center;

  :first-child {
    margin-top: 30px;
  }
`;

const StyledIngredientsListWrapper = styled.div``;

const GroupedIngredientsList = (props) => {
  const { ingredients, isFavoriteModeOn } = props;
  const barIngredients = useSelector((state) => state.barIngredients.items);

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
      {ingredients.map((ingredientGroup) => (
        <React.Fragment key={`group${ingredientGroup.groupId}`}>
          <StyledIngredientCategoryName>
            {ingredientGroup.groupName}
          </StyledIngredientCategoryName>
          <StyledIngredientsList>
            {ingredientGroup.items &&
              ingredientGroup.items.map((ingredient) => (
                <StyleIngredientsListItem key={ingredient.id}>
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
        </React.Fragment>
      ))}
    </StyledIngredientsListWrapper>
  );
};

export default GroupedIngredientsList;
