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
  const [searchParams, setSearchParams] = useState(null);

  useEffect(() => {
    if (searchParams) {
      dispatch(fetchBarIngredients());
    }

    return () => {
      dispatch(resetIngredients());
    };
  }, [dispatch, searchParams]);

  const handleSearchParamsChange = useCallback((searchParams) => {
    console.log(searchParams);
    setSearchParams(searchParams);
  }, []);

  return (
    <div>
      <IngredientsSearch onSearchParamsChange={handleSearchParamsChange} />
      {isPending && <Loader />}
      {!isPending && (
        <IngredientsList ingredients={ingredients}></IngredientsList>
      )}
    </div>
  );
};
