import React, { useEffect, useState, useCallback } from "react";
import IngredientsSearch from "../ingredients/IngredientsSearch";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../features/ingredients/ingredientsSlice";
import IngredientsList from "../ingredients/IngredientsList";

export const IngredientsPage = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients);
  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    dispatch(fetchIngredients(searchParams));
  }, [dispatch, searchParams]);

  const handleSearchParamsChange = useCallback((searchParams) => {
    console.log(searchParams);
    setSearchParams(searchParams);
  }, []);

  return (
    <div>
      <IngredientsSearch onSearchParamsChange={handleSearchParamsChange} />
      <IngredientsList ingredients={ingredients}></IngredientsList>
    </div>
  );
};
