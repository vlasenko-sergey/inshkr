import React from "react";
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

const IngredientsList = (props) => {
  const { ingredients } = props;

  return (
    <StyledIngredientsList>
      {ingredients.map((ingredient) => (
        <StyleIngredientsListItem key={ingredient.id}>
          <Link to={`/ingredients/${ingredient.id}`}>
            <Ingredient ingredient={ingredient} />
          </Link>
        </StyleIngredientsListItem>
      ))}
    </StyledIngredientsList>
  );
};

export default IngredientsList;
