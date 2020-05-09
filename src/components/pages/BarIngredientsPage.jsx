import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IngredientsList from "../ingredients/IngredientsList";
import Loader from "../Loader";
import { fetchBarIngredients, resetBarIngredients } from "../../features/bar/barIngredientsSlice";

export const BarIngredientsPage = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.barIngredients.items);
  const isPending = useSelector((state) => state.barIngredients.isPending);

  useEffect(() => {
    dispatch(fetchBarIngredients());

    return () => {
      dispatch(resetBarIngredients());
    }
  }, [dispatch]);

  if (isPending) {
    return <Loader />;
  }

  return <IngredientsList isAddButtonShown ingredients={ingredients} />;
};
