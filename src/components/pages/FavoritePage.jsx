import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFavorites } from "../../features/favorites/favoritesSlice";

const FavoritePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
    return () => {};
  }, [dispatch]);

  return <div>FavoritePage</div>;
};

export default FavoritePage;
