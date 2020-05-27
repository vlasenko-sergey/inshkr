import React, { useEffect, useState, useCallback } from "react";
import CocktailsSearch from "../cocktails/CoctailsSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCocktails,
  searchCocktails,
} from "../../features/cocktails/cocktailsSlice";
import CocktailsList from "../cocktails/CocktailsList";
import Loader from "../Loader";
import { useLocation } from "react-router-dom";

export const CocktailsPage = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.cocktails.items);
  const isPending = useSelector((state) => state.cocktails.isPending);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const base = params.get("base");
  const [searchParams, setSearchParams] = useState({ tastes: [], base });

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
