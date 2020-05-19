import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchCocktails,
  resetCocktails,
} from "../../../features/cocktails/cocktailsSlice";
import CocktailsSearch from "../../cocktails/CoctailsSearch";
import Loader from "../../Loader";
import AdminCocktailsList from "../../admin/cocktails/AdminCocktailsList";
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

const AdminCocktailsPage = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.cocktails.items);
  const isPending = useSelector((state) => state.cocktails.isPending);
  const [searchParams, setSearchParams] = useState({ tastes: [] });

  useEffect(() => {
    if (searchParams) {
      dispatch(searchCocktails(searchParams));
    }

    return () => {
      dispatch(resetCocktails());
    };
  }, [dispatch, searchParams]);

  const handleSearchParamsChange = useCallback((searchParams) => {
    setSearchParams(searchParams);
  }, []);

  return (
    <div>
      <StyledLink to="/admin/cocktails/create">Добавить коктейль</StyledLink>
      <CocktailsSearch onSearchParamsChange={handleSearchParamsChange} />
      {isPending && <Loader />}
      {!isPending && (
        <AdminCocktailsList cocktails={cocktails}></AdminCocktailsList>
      )}
    </div>
  );
};

export default AdminCocktailsPage;
