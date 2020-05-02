import React, { useEffect } from "react";
import CoctailsSearch from "../CoctailsSearch";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails } from "../../features/cocktails/cocktailsSlice";
import CocktailesList from "../CocktailesList";

export const HomePage = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.cocktails);

  useEffect(() => {
    dispatch(fetchCocktails());
    return () => {
      console.log("clean");
    };
  }, [dispatch]);

  return (
    <div>
      <CoctailsSearch />
      <CocktailesList cocktails={cocktails}></CocktailesList>
    </div>
  );
};
