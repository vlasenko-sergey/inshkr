import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktailById } from "../../features/cocktails/cocktailSlice";
import { useParams } from "react-router-dom";

export const CocktailPage = () => {
  const dispatch = useDispatch();
  const cocktail = useSelector((state) => state.cocktail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCocktailById(id));
    return () => {
      console.log("clean");
    };
  }, [dispatch, id]);

  return <div>{cocktail.nameRu}</div>;
};
