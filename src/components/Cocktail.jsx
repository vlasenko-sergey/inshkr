import React from "react";
import styled from "styled-components";

const StyledCocktailImageWrapper = styled.div`
  text-align: center;
  height: 250px;
`;

const StyledCocktailImage = styled.img`
  object-fit: cover;
  height: 100%;
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
          src="https://ru.inshaker.com/uploads/cocktail/hires/1098/1537863520-Aperol_spritz-HiRes.jpg"
          alt=""
        />
      </StyledCocktailImageWrapper>
      <StyledCocktailNameRu>{cocktail.nameRu}</StyledCocktailNameRu>
      <StyledCocktailNameEn>{cocktail.nameEn}</StyledCocktailNameEn>
    </div>
  );
};

export default Cocktail;
