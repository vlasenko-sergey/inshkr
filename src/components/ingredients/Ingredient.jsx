import React from "react";
import styled from "styled-components";

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

const Ingredient = (props) => {
  const { ingredient } = props;

  return (
    <div>
      <StyledIngredientImageWrapper>
        <StyledIngredientImage src={ingredient.imageRef} alt="" />
      </StyledIngredientImageWrapper>
      <StyledIngredientNameRu>{ingredient.nameRu}</StyledIngredientNameRu>
      <StyledIngredientNameEn>{ingredient.nameEn}</StyledIngredientNameEn>
    </div>
  );
};

export default Ingredient;
