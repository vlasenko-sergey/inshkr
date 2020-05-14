import React, { useEffect, useState, useCallback } from "react";
import IngredientsSearch from "../ingredients/IngredientsSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  resetIngredients,
  fetchIngredients,
} from "../../features/ingredients/ingredientsSlice";
import Loader from "../Loader";
import { searchIngredients } from "../../features/ingredients/searchIngredientsSlice";
import GroupedIngredientsList from "../ingredients/GroupedIngredientsList";
import IngredientsList from "../ingredients/IngredientsList";
import qs from "qs";
import { fetchBarIngredients, resetBarIngredients } from "../../features/bar/barIngredientsSlice";

export const IngredientsPage = (props) => {
  const { location } = props;
  const { addToBarMode } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.items);
  const isPending = useSelector((state) => state.ingredients.isPending);
  const searchedIngredients = useSelector(
    (state) => state.searchIngredients.items
  );
  const searchIsPending = useSelector(
    (state) => state.searchIngredients.isPending
  );
  const [searchParams, setSearchParams] = useState(null);

  useEffect(() => {
    dispatch(fetchBarIngredients());

    return () => {
      dispatch(resetBarIngredients());
    }
  }, [dispatch]);

  const isSearchParamsEmpty = useCallback(() => {
    if (!searchParams) {
      return true;
    }
    return Object.entries(searchParams).every(
      (param) => !param[1] ||  (Array.isArray(param[1]) && !param[1].length)
    );
  }, [searchParams]);

  useEffect(() => {
    if (!isSearchParamsEmpty()) {
      dispatch(searchIngredients(searchParams));
    } else {
      dispatch(fetchIngredients());
    }

    return () => {
      dispatch(resetIngredients());
    };
  }, [dispatch, searchParams, isSearchParamsEmpty]);

  const handleSearchParamsChange = useCallback((searchParams) => {
    setSearchParams(searchParams);
  }, []);

  return (
    <div>
      <IngredientsSearch onSearchParamsChange={handleSearchParamsChange} />
      {(isPending || searchIsPending) && <Loader />}
      {!isPending && isSearchParamsEmpty() && (
        <GroupedIngredientsList
          isFavoriteModeOn={addToBarMode}
          ingredients={ingredients}
        />
      )}
      {!searchIsPending && !isSearchParamsEmpty() && (
        <IngredientsList
          isFavoriteModeOn={addToBarMode}
          ingredients={searchedIngredients}
        />
      )}
    </div>
  );
};
