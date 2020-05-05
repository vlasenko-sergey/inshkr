import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../Loader";
import {
  fetchIngredientById,
  resetIngredient,
} from "../../features/ingredients/ingredientSlice";

const StyledIngredientPageMain = styled.div`
  display: flex;
  margin-top: 40px;
`;

const StyledIngredientPageImageWrapper = styled.div`
  width: calc(50% - 20px);
  margin-right: 20px;
  text-align: center;
`;

const StyledIngredientPageImage = styled.img`
  max-width: 100%;
  max-height: 470px;
`;

const StyledIngredientPageRecipe = styled.div`
  width: 50%;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const StyledIngredientPageRecipeTitle = styled.div`
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 25px;

  :not(:first-child) {
    margin-top: 25px;
  }
`;

const StyledIngredients = styled.div`
  text-align: justify;
  text-indent: 40px;
`;

export const IngredientPage = () => {
  const dispatch = useDispatch();
  const ingredient = useSelector((state) => state.ingredient.item);
  const isPending = useSelector((state) => state.ingredient.isPending);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchIngredientById(id));

    return () => {
      dispatch(resetIngredient());
    };
  }, [dispatch, id]);

  if (isPending) {
    return <Loader />;
  }

  if (!ingredient) {
    return null;
  }

  return (
    <div>
      <h1>{ingredient.nameRu}</h1>
      <h2>{ingredient.nameEn}</h2>
      <StyledInfo>
        <div>{ingredient.spirit}%</div>
        <StyledInfoCircle />
        <div>{ingredient.subgroup}</div>
        <StyledInfoCircle />
        <div>{ingredient.ingredientGroup}</div>
      </StyledInfo>
      <StyledIngredientPageMain>
        <StyledIngredientPageImageWrapper>
          <StyledIngredientPageImage src={ingredient.imageRef} alt="" />
        </StyledIngredientPageImageWrapper>
        <StyledIngredientPageRecipe>
          <StyledIngredientPageRecipeTitle>
            Описание
          </StyledIngredientPageRecipeTitle>
          <StyledIngredients>
            {ingredient.legend}
          </StyledIngredients>
        </StyledIngredientPageRecipe>
      </StyledIngredientPageMain>
    </div>
  );
};
