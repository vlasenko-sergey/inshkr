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
import { fetchTablewareById } from "../../features/ingredients/tablewareSlice";
import { fetchGarnishById } from "../../features/ingredients/garnishSlice";
import CocktailsList from "../cocktails/CocktailsList";

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

const StyledCocktails = styled.div`
  margin-top: 50px;
`;

export const IngredientPage = (props) => {
  const { type, isAdmin } = props;
  const dispatch = useDispatch();
  const ingredient = useSelector((state) => state.ingredient.item);
  const isIngredientPending = useSelector(
    (state) => state.ingredient.isPending
  );
  const garnish = useSelector((state) => state.garnish.item);
  const isGarnishPending = useSelector((state) => state.garnish.isPending);
  const tableware = useSelector((state) => state.tableware.item);
  const isTablewarePending = useSelector((state) => state.tableware.isPending);
  const [isInBar, setIsInBar] = useState(false);
  const { id } = useParams();
  const user = useSelector((state) => state.user.item);

  const getItem = () => {
    switch (type) {
      case "ingredient":
        return ingredient;
      case "garnish":
        return garnish;
      case "tableware":
        return tableware;
      default:
        return null;
    }
  };

  const getPending = () => {
    switch (type) {
      case "ingredient":
        return isIngredientPending;
      case "garnish":
        return isGarnishPending;
      case "tableware":
        return isTablewarePending;
      default:
        return null;
    }
  };

  useEffect(() => {
    switch (type) {
      case "ingredient":
        dispatch(fetchIngredientById(id));
        break;
      case "tableware":
        dispatch(fetchTablewareById(id));
        break;
      case "garnish":
        dispatch(fetchGarnishById(id));
        break;
      default:
        break;
    }

    return () => {
      dispatch(resetIngredient());
    };
  }, [dispatch, id, type]);

  useEffect(() => {
    if (ingredient) {
      setIsInBar(ingredient.inBar);
    }
  }, [ingredient]);

  const handleAddToBarClick = () => {
    if (isInBar) {
      dispatch(deleteIngredientFromBar(getItem().id));
    } else {
      dispatch(addIngredientToBar(getItem().id));
    }
    setIsInBar(!isInBar);
  };

  if (getPending()) {
    return <Loader />;
  }

  if (!getItem()) {
    return null;
  }

  return (
    <StyledIngredientPage>
      {user && !isAdmin && (
        <StyledAddToBarIcon onClick={handleAddToBarClick} active={isInBar}>
          <AddToBarIcon />
        </StyledAddToBarIcon>
      )}
      <h1>{getItem().nameRu}</h1>
      <h2>{getItem().nameEn}</h2>
      <StyledInfo>
        {getItem().spirit ? (
          <>
            <div>{getItem().spirit}%</div>
            <StyledInfoCircle />
          </>
        ) : null}
        <div>{getItem().itemSubgroup.name}</div>
        <StyledInfoCircle />
        <div>{getItem().itemSubgroup.itemGroup.name}</div>
      </StyledInfo>
      <StyledIngredientPageMain>
        <StyledIngredientPageImageWrapper>
          <StyledIngredientPageImage src={getItem().imageRef} alt="" />
        </StyledIngredientPageImageWrapper>
        <StyledIngredientPageRecipe>
          <StyledIngredientPageRecipeTitle>
            Описание
          </StyledIngredientPageRecipeTitle>
          <StyledIngredients>{getItem().legend}</StyledIngredients>
        </StyledIngredientPageRecipe>
      </StyledIngredientPageMain>
      {getItem().cocktails && getItem().cocktails.length > 0 && (
        <StyledCocktails>
          <h2>Коктейли</h2>
          <CocktailsList cocktails={getItem().cocktails} />
        </StyledCocktails>
      )}
    </StyledIngredientPage>
  );
};
