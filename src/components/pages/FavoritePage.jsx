import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavorites,
  resetFavorites,
} from "../../features/favorites/favoritesSlice";
import CocktailsList from "../cocktails/CocktailsList";
import Loader from "../Loader";

const FavoritePage = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.favorites.items);
  const isPending = useSelector((state) => state.favorites.isPending);

  useEffect(() => {
    dispatch(fetchFavorites());
    return () => {
      dispatch(resetFavorites());
    };
  }, [dispatch]);

  return (
    <div>
      <h1>Избранное</h1>
      {isPending && <Loader />}
      {!isPending && <CocktailsList cocktails={cocktails} />}
    </div>
  );
};

export default FavoritePage;
