import React from "react";
import styled from "styled-components";
import { ReactComponent as AddToFavoriteIcon } from "../../images/add_to_favorite.svg";

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

const StyledCocktailFavoriteMode = styled.div`
  position: relative;
  cursor: pointer;
`;

const StyledCocktailDefault = styled.div``;

const StyledCocktail = (props) =>
  props.isFavoriteModeOn ? (
    <StyledCocktailFavoriteMode>{props.children}</StyledCocktailFavoriteMode>
  ) : (
    <StyledCocktailDefault>{props.children}</StyledCocktailDefault>
  );

const StyledFavoriteModeWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1;
`;

const StyledAddToFavoriteIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${({ checked }) =>
    checked &&
    `
    path {
      fill: #4AA8FF;
    }
    `}
`;

const Cocktail = (props) => {
  const { cocktail, isFavoriteModeOn, isFavorite } = props;

  return (
    <StyledCocktail isFavoriteModeOn={isFavoriteModeOn}>
      {isFavoriteModeOn && (
        <StyledFavoriteModeWrapper>
          <StyledAddToFavoriteIcon checked={isFavorite}>
            <AddToFavoriteIcon  />
          </StyledAddToFavoriteIcon>
        </StyledFavoriteModeWrapper>
      )}
      <StyledCocktailImageWrapper>
        <StyledCocktailImage src={cocktail.imageRef} alt="" />
      </StyledCocktailImageWrapper>
      <StyledCocktailNameRu>{cocktail.nameRu}</StyledCocktailNameRu>
      <StyledCocktailNameEn>{cocktail.nameEn}</StyledCocktailNameEn>
    </StyledCocktail>
  );
};

export default Cocktail;
