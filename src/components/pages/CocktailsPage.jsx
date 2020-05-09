import React, { useEffect, useState, useCallback } from "react";
import CocktailsSearch from "../cocktails/CoctailsSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCocktails,
  searchCocktails,
} from "../../features/cocktails/cocktailsSlice";
import CocktailsList from "../cocktails/CocktailsList";
import Loader from "../Loader";

export const CocktailsPage = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.cocktails.items);
  const isPending = useSelector((state) => state.cocktails.isPending);
  const [searchParams, setSearchParams] = useState({tastes: []});

  useEffect(() => {
    if (searchParams) {
      dispatch(searchCocktails(searchParams));
    }

    return () => {
      dispatch(resetCocktails());
    };
  }, [dispatch, searchParams]);

  const handleSearchParamsChange = useCallback((searchParams) => {
    setSearchParams(searchParams);
  }, []);

  return (
    <div>
      <CocktailsSearch onSearchParamsChange={handleSearchParamsChange} />
      {isPending && <Loader />}
      {!isPending && <CocktailsList cocktails={cocktails}></CocktailsList>}
    </div>
  );
};
