import React, { useEffect, useState, useCallback } from "react";
import CocktailsSearch from "../cocktails/CoctailsSearch";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails } from "../../features/cocktails/cocktailsSlice";
import CocktailesList from "../cocktails/CocktailesList";
import Loader from "../Loader";

export const CocktailsPage = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.cocktails.items);
  const isPending = useSelector((state) => state.cocktails.isPending);
  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    dispatch(fetchCocktails(searchParams));
  }, [dispatch, searchParams]);

  const handleSearchParamsChange = useCallback((searchParams) => {
    console.log(searchParams);
    setSearchParams(searchParams);
  }, []);

  return (
    <div>
      <CocktailsSearch onSearchParamsChange={handleSearchParamsChange} />
      {isPending && <Loader />}
      {!isPending && <CocktailesList cocktails={cocktails}></CocktailesList>}
    </div>
  );
};