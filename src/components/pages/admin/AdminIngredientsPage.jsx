import React, { useEffect, useState, useCallback } from "react";
import IngredientsSearch from "../../ingredients/IngredientsSearch";
import { useDispatch, useSelector } from "react-redux";
import { resetIngredients } from "../../../features/ingredients/ingredientsSlice";
import Loader from "../../Loader";
import { searchIngredients } from "../../../features/ingredients/searchIngredientsSlice";
import {
  fetchBarIngredients,
  resetBarIngredients,
} from "../../../features/bar/barIngredientsSlice";
import AdminIngredientsList from "../../admin/ingredients/AdminIngredientsList";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  font-size: 24px;
  line-height: 29px;
  text-transform: uppercase;
  cursor: pointer;
  background: none;
  border: none;
  display: block;
  margin-bottom: 10px;
`;

export const AdminIngredientsPage = (props) => {
  const dispatch = useDispatch();
  const searchedIngredients = useSelector(
    (state) => state.searchIngredients.items
  );
  const searchIsPending = useSelector(
    (state) => state.searchIngredients.isPending
  );
  const [searchParams, setSearchParams] = useState(null);

  useEffect(() => {
    dispatch(fetchBarIngredients());

    return () => {
      dispatch(resetBarIngredients());
    };
  }, [dispatch]);

  const isSearchParamsEmpty = useCallback(() => {
    if (!searchParams) {
      return true;
    }
    return Object.entries(searchParams).every(
      (param) => !param[1] || (Array.isArray(param[1]) && !param[1].length)
    );
  }, [searchParams]);

  useEffect(() => {
    dispatch(searchIngredients(searchParams));

    return () => {
      dispatch(resetIngredients());
    };
  }, [dispatch, searchParams, isSearchParamsEmpty]);

  const handleSearchParamsChange = useCallback((searchParams) => {
    setSearchParams(searchParams);
  }, []);

  return (
    <div>
      <StyledLink to="/admin/ingredients/create">Добавить ингредиент</StyledLink>
      <StyledLink to="/admin/tableware/create">Добавить посуду</StyledLink>
      <StyledLink to="/admin/garnish/create">Добавить украшение</StyledLink>
      <IngredientsSearch onSearchParamsChange={handleSearchParamsChange} />
      {searchIsPending && <Loader />}
      {!searchIsPending && (
        <AdminIngredientsList ingredients={searchedIngredients} />
      )}
    </div>
  );
};
