import React from "react";
import styled from "styled-components";

const StyledCocktailImageWrapper = styled.div`
  text-align: center;
`;

const StyledCocktailImage = styled.img`
  width: 188px;
  height: 250px;
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
        <StyledCocktailImage
          src="https://ru.inshaker.com/uploads/cocktail/hires/55/1556107543-negroni-image-final.jpg"
          alt=""
        />
      </StyledCocktailImageWrapper>
      <StyledCocktailNameRu>{cocktail.nameRu}</StyledCocktailNameRu>
      <StyledCocktailNameEn>{cocktail.nameEn}</StyledCocktailNameEn>
    </div>
  );
};

export default Cocktail;
