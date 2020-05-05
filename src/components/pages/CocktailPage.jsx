import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCocktailById,
  resetCocktail,
} from "../../features/cocktails/cocktailSlice";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../Loader";

const StyledCocktailPageMain = styled.div`
  display: flex;
  margin-top: 40px;
`;

const StyledCocktailPageImageWrapper = styled.div`
  width: calc(50% - 20px);
  margin-right: 20px;
  text-align: center;
`;

const StyledCocktailPageImage = styled.img`
  max-width: 100%;
  max-height: 470px;
`;

const StyledCocktailPageRecipe = styled.div`
  width: 50%;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const StyledInfo = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  line-height: 22px;
  text-transform: lowercase;
  margin-top: 20px;
  align-items: center;
`;

const StyledInfoCircle = styled.div`
  width: 8px;
  height: 8px;
  background-color: transparent;
  border: 2px solid #000;
  border-radius: 50%;
  margin: 0 10px;
`;

const StyledCocktailPageRecipeTitle = styled.div`
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 25px;

  :not(:first-child) {
    margin-top: 25px;
  }
`;

const StyledCocktailPageRecipeTitleInput = styled.input`
  width: 35px;
  text-align: center;
  font-size: 24px;
  line-height: 29px;
`;

const StyledIngredients = styled.div`
  padding-left: 40px;
`;

export const CocktailPage = () => {
  const dispatch = useDispatch();
  const cocktail = useSelector((state) => state.cocktail.item);
  const isPending = useSelector((state) => state.cocktail.isPending);
  const { id } = useParams();
  const [servingsAmount, setServingsAmount] = useState(1);

  useEffect(() => {
    dispatch(fetchCocktailById(id));

    return () => {
      dispatch(resetCocktail());
    };
  }, [dispatch, id]);

  const handleServingsInputChange = (event) => {
    const newValue = Number(event.target.value);
    if (newValue) {
      setServingsAmount(newValue);
    }
  };

  if (isPending) {
    return <Loader />;
  }

  if (!cocktail) {
    return null;
  }

  return (
    <div>
      <h1>{cocktail.nameRu}</h1>
      <h2>{cocktail.nameEn}</h2>
      <StyledInfo>
        <div>{cocktail.base.nameRu}</div>
        <StyledInfoCircle />
        <div>{cocktail.spirit}%</div>
        <StyledInfoCircle />
        <div>{cocktail.subgroup}</div>
      </StyledInfo>
      <StyledCocktailPageMain>
        <StyledCocktailPageImageWrapper>
          <StyledCocktailPageImage src={cocktail.imageRef} alt="" />
        </StyledCocktailPageImageWrapper>
        <StyledCocktailPageRecipe>
          <StyledCocktailPageRecipeTitle>
            На{" "}
            <StyledCocktailPageRecipeTitleInput
              type="text"
              defaultValue="1"
              onChange={handleServingsInputChange}
            />{" "}
            порцию мл:
          </StyledCocktailPageRecipeTitle>
          <StyledIngredients>
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
          </StyledIngredients>
          <StyledCocktailPageRecipeTitle>
            Способ смешивания:
          </StyledCocktailPageRecipeTitle>
          <StyledIngredients>
            <div>{cocktail.mixingMethod}</div>
          </StyledIngredients>
          <StyledCocktailPageRecipeTitle>
            Способ подачи:
          </StyledCocktailPageRecipeTitle>
          <StyledIngredients>
            <div>{cocktail.glass.nameRu}</div>
            <div>{cocktail.garnish && cocktail.garnish.nameRu}</div>
          </StyledIngredients>
        </StyledCocktailPageRecipe>
      </StyledCocktailPageMain>
      <div>
        <StyledHistoryHeader>История</StyledHistoryHeader>
        <StyledHistoryText>{cocktail.legend}</StyledHistoryText>
      </div>
    </div>
  );
};
