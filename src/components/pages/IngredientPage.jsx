import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchIngredientById } from "../../features/ingredients/ingredientSlice";

export const IngredientPage = () => {
  const dispatch = useDispatch();
  const ingredient = useSelector((state) => state.ingredient);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchIngredientById(id));
  }, [dispatch, id]);

  if (!ingredient) {
    return null;
  }

  return (
    <div>
      <h1>{ingredient.nameRu}</h1>
      <h2>{ingredient.nameEn}</h2>
    </div>
  );
};
