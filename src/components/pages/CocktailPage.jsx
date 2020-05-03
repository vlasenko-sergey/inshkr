import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktailById } from "../../features/cocktails/cocktailSlice";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledCocktailPageMain = styled.div`
  display: flex;
  margin-top: 20px;
`;

const StyledCocktailPageImageWrapper = styled.div`
  width: calc(50% - 50px);
  margin-right: 50px;
`;

const StyledCocktailPageImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const StyledCocktailPageRecipe = styled.div`
  width: 50%;
  font-size: 18px;
  line-height: 22px;
  padding-top: 90px;
`;

const StyledIngredientWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StyledIngredientDots = styled.div`
  border-bottom: 2px dotted #757575;
  flex-grow: 1;
  margin: 0 10px 5px 5px;
`;

const StyledHistoryHeader = styled.h2`
  text-transform: none;
  margin-top: 80px;
`;

const StyledHistoryText = styled.div`
  font-size: 18px;
  line-height: 22px;
  text-align: justify;
  text-indent: 40px;
  margin-top: 20px;
`;

export const CocktailPage = () => {
  const dispatch = useDispatch();
  const cocktail = useSelector((state) => state.cocktail);
  const { id } = useParams();
  const [servingsAmount, setServingsAmount] = useState(1);

  useEffect(() => {
    dispatch(fetchCocktailById(id));
  }, [dispatch, id]);

  const handleServingsInputChange = (event) => {
    const newValue = Number(event.target.value);
    if (newValue) {
      setServingsAmount(newValue);
    }
  };

  if (!cocktail) {
    return null;
  }

  return (
    <div>
      <h1>{cocktail.nameRu}</h1>
      <h2>{cocktail.nameEn}</h2>
      <div>
        <div>{cocktail.base.nameRu}</div>
        <div>{cocktail.spirit}%</div>
        <div>{cocktail.subgroup}</div>
      </div>
      <StyledCocktailPageMain>
        <StyledCocktailPageImageWrapper>
          <StyledCocktailPageImage
            src="https://us.inshaker.com/uploads/cocktail/hires/29/1556446379-kosmopoliten-image-final.jpg"
            alt=""
          />
        </StyledCocktailPageImageWrapper>
        {
          <StyledCocktailPageRecipe>
            <div>
              <input
                type="text"
                defaultValue="1"
                onChange={handleServingsInputChange}
              />
            </div>
            {cocktail.recipe
              .filter((item) => item.amount)
              .map((item) => (
                <StyledIngredientWrapper>
                  <div>{item.ingredient.nameRu}</div>
                  <StyledIngredientDots />
                  <div>{item.amount * servingsAmount}</div>
                </StyledIngredientWrapper>
              ))}
            {cocktail.recipe
              .filter((item) => !item.amount)
              .map((item) => (
                <StyledIngredientWrapper>
                  <div>{item.ingredient.nameRu}</div>
                </StyledIngredientWrapper>
              ))}
            <div>{cocktail.mixingMethod}</div>
            <div>{cocktail.glass.nameRu}</div>
            <div>{cocktail.garnish && cocktail.garnish.nameRu}</div>
          </StyledCocktailPageRecipe>
        }
      </StyledCocktailPageMain>
      <div>
        <StyledHistoryHeader>История</StyledHistoryHeader>
        <StyledHistoryText>{cocktail.legend}</StyledHistoryText>
      </div>
    </div>
  );
};
