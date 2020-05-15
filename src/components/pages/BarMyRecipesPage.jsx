import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  resetCustomCocktails,
  fetchCustomCocktails,
} from "../../features/cocktails/customCocktailsSlice";
import { useDispatch, useSelector } from "react-redux";
import CocktailsList from "../cocktails/CocktailsList";
import Loader from "../Loader";

const BarMyRecipesPage = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.customCocktails.items);
  const isPending = useSelector((state) => state.customCocktails.isPending);

  useEffect(() => {
    dispatch(fetchCustomCocktails());
    return () => {
      dispatch(resetCustomCocktails());
    };
  }, [dispatch]);

  if (!cocktails || isPending) {
    return <Loader />;
  }

  return (
    <div>
      <CocktailsList isAddButtonShown customCocktails cocktails={cocktails} />
    </div>
  );
};

export default BarMyRecipesPage;
