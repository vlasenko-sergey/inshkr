import React from "react";
import styled from "styled-components";

const StyledCocktailImageWrapper = styled.div`
  text-align: center;
  height: 250px;
  overflow: hidden;
  position: relative;
`;

const StyledCocktailImage = styled.img`
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

const Cocktail = (props) => {
  const { cocktail } = props;

  return (
    <div>
      <StyledCocktailImageWrapper>
        <StyledCocktailImage src={cocktail.imageRef} alt="" />
      </StyledCocktailImageWrapper>
      <StyledCocktailNameRu>{cocktail.nameRu}</StyledCocktailNameRu>
      <StyledCocktailNameEn>{cocktail.nameEn}</StyledCocktailNameEn>
    </div>
  );
};

export default Cocktail;
