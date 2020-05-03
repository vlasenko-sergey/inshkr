import React from "react";
import styled from "styled-components";

const StyledIngredientImageWrapper = styled.div`
  text-align: center;
  height: 250px;
`;

const StyledIngredientImage = styled.img`
  object-fit: cover;
  height: 100%;
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
        <StyledIngredientImage
          src="https://ru.inshaker.com/uploads/good/image_common/62/1587386612-WOODFORD_STRAIGHT_BOURBON_WHISKEY_460%D1%85865.jpg"
          alt=""
        />
      </StyledIngredientImageWrapper>
      <StyledIngredientNameRu>{ingredient.nameRu}</StyledIngredientNameRu>
      <StyledIngredientNameEn>{ingredient.nameEn}</StyledIngredientNameEn>
    </div>
  );
};

export default Ingredient;
