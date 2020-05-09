import React, { useEffect, useState, useCallback } from "react";
import IngredientsSearch from "../ingredients/IngredientsSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  resetIngredients,
} from "../../features/ingredients/ingredientsSlice";
import IngredientsList from "../ingredients/IngredientsList";
import Loader from "../Loader";
import { fetchBarIngredients } from "../../features/bar/barIngredientsSlice";

export const BarIngredientsPage = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.barIngredients.items);
  const isPending = useSelector((state) => state.barIngredients.isPending);

  useEffect(() => {
    dispatch(fetchBarIngredients());
    return () => {
      dispatch(resetIngredients());
    };
  }, [dispatch]);

  const handleAddButtonClick = () => {
    console.log('yaay');
  }


  return (
    <div>
      {isPending && <Loader />}
      {!isPending && (
        <IngredientsList onAddButtonClick={handleAddButtonClick } ingredients={ingredients}></IngredientsList>
      )}
    </div>
  );
};
