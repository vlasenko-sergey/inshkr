import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBarCocktails, resetBarCocktails } from "../../features/bar/barCocktailsSlice";
import Loader from "../Loader";
import CocktailsList from "../cocktails/CocktailsList";

const BarCocktailsPage = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.barCocktails.items);
  const isPending = useSelector((state) => state.barCocktails.isPending);

  useEffect(() => {
    dispatch(fetchBarCocktails());

    return () => {
      dispatch(resetBarCocktails());
    }
  }, [dispatch]);

  if (isPending) {
    return <Loader />;
  }

  return <CocktailsList cocktails={cocktails} />
};

export default BarCocktailsPage;
