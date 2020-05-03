import React, { useEffect, useState, useCallback } from "react";
import CocktailsSearch from "../CoctailsSearch";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails } from "../../features/cocktails/cocktailsSlice";
import CocktailesList from "../CocktailesList";

export const HomePage = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.cocktails);
  const [searchParams, setSearchParams] = useState({ search: "", base: "" });

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
      <CocktailesList cocktails={cocktails}></CocktailesList>
    </div>
  );
};
