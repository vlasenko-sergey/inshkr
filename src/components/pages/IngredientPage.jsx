import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../Loader";
import {
  fetchIngredientById,
  resetIngredient,
} from "../../features/ingredients/ingredientSlice";
import { ReactComponent as AddToBarIcon } from "../../images/add_to_bar.svg";
import {
  deleteIngredientFromBar,
  addIngredientToBar,
} from "../../features/bar/barIngredientsSlice";

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

const StyledIngredientPage = styled.div`
  position: relative;
`;

const StyledAddToBarIcon = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;

  svg {
    width: 40px;
    height: 40px;

    path {
      stroke: #888888;
      fill: #888888;
    }

    ${({ active }) =>
      active &&
      ` path {
      fill: #000000;
      stroke: #000000;
    }
    `}
  }
`;

export const IngredientPage = () => {
  const dispatch = useDispatch();
  const ingredient = useSelector((state) => state.ingredient.item);
  const isPending = useSelector((state) => state.ingredient.isPending);
  const [isInBar, setIsInBar] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchIngredientById(id));

    return () => {
      dispatch(resetIngredient());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (ingredient) {
      setIsInBar(ingredient.inBar);
    }
  }, [ingredient]);

  const handleAddToBarClick = () => {
    if (isInBar) {
      dispatch(deleteIngredientFromBar(ingredient.id));
    } else {
      dispatch(addIngredientToBar(ingredient.id));
    }
    setIsInBar(!isInBar);
  };

  if (isPending) {
    return <Loader />;
  }

  if (!ingredient) {
    return null;
  }

  return (
    <StyledIngredientPage>
      <StyledAddToBarIcon
        onClick={handleAddToBarClick}
        active={isInBar}
      >
        <AddToBarIcon />
      </StyledAddToBarIcon>
      <h1>{ingredient.nameRu}</h1>
      <h2>{ingredient.nameEn}</h2>
      <StyledInfo>
        <div>{ingredient.spirit}%</div>
        <StyledInfoCircle />
        <div>{ingredient.itemSubgroup.name}</div>
        <StyledInfoCircle />
        <div>{ingredient.itemSubgroup.itemGroup.name}</div>
      </StyledInfo>
      <StyledIngredientPageMain>
        <StyledIngredientPageImageWrapper>
          <StyledIngredientPageImage src={ingredient.imageRef} alt="" />
        </StyledIngredientPageImageWrapper>
        <StyledIngredientPageRecipe>
          <StyledIngredientPageRecipeTitle>
            Описание
          </StyledIngredientPageRecipeTitle>
          <StyledIngredients>{ingredient.legend}</StyledIngredients>
        </StyledIngredientPageRecipe>
      </StyledIngredientPageMain>
    </StyledIngredientPage>
  );
};
