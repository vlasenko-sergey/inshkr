import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AdminTileItem from "../AdminTileItem";

const StyledIngredientsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const StyleIngredientsListItem = styled.div`
  width: calc(25% - 20px);
  margin: 0 10px 40px 10px;
`;

const StyledIngredientsListWrapper = styled.div``;

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

const AdminIngredientsList = (props) => {
  const { ingredients } = props;
  return (
    <StyledIngredientsListWrapper>
      <StyledIngredientsList>
        {ingredients &&
          ingredients.map((ingredient) => (
            <StyleIngredientsListItem key={`ingredient${ingredient.id}`}>
              <Link to={`/admin/${getLinkByType(ingredient.dtype)}/${ingredient.id}`}>
                <AdminTileItem item={ingredient} type={ingredient.dtype.toLowerCase()} />
              </Link>
            </StyleIngredientsListItem>
          ))}
      </StyledIngredientsList>
    </StyledIngredientsListWrapper>
  );
};

export default AdminIngredientsList;
