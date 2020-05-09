import React, { useEffect, useState, useCallback } from "react";
import IngredientsSearch from "../ingredients/IngredientsSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIngredients,
  resetIngredients,
} from "../../features/ingredients/ingredientsSlice";
import IngredientsList from "../ingredients/IngredientsList";
import Loader from "../Loader";

export const IngredientsPage = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.items);
  const isPending = useSelector((state) => state.ingredients.isPending);
  const [searchParams, setSearchParams] = useState(null);

  useEffect(() => {
    if (searchParams) {
      dispatch(fetchIngredients(searchParams));
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
        <IngredientsList isAddButtonShown ingredients={ingredients}></IngredientsList>
      )}
    </div>
  );
};
