import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CocktailsFilterGroup from "./CocktailsFilterGroup";
import { useDispatch, useSelector } from "react-redux";
import { fetchBases } from "../features/cocktails/basesSlice";
import { fetchGroups } from "../features/cocktails/groupsSlice";
import { fetchSpirits } from "../features/cocktails/spiritsSlice";
import { fetchTastes } from "../features/cocktails/tastesSlice";

const StyledCocktailsSearchInput = styled.input`
  height: 40px;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border: 2px solid #9c9c9c;
  outline: none;
  width: 100%;
  margin-top: 20px;
  padding: 18px 9px;

  ::placeholder {
    color: #c4c4c4;
  }
`;

const CocktailsSearch = (props) => {
  const { onSearchParamsChange } = props;
  const dispatch = useDispatch();
  const bases = useSelector((state) => state.bases);
  const spirits = useSelector((state) => state.spirits);
  const groups = useSelector((state) => state.groups);
  const tastes = useSelector((state) => state.tastes);

  const [searchParams, setSearchParams] = useState({ search: "", base: "" });

  useEffect(() => {
    dispatch(fetchBases());
    dispatch(fetchSpirits());
    dispatch(fetchGroups());
    dispatch(fetchTastes());
  }, [dispatch]);

  useEffect(() => {
    onSearchParamsChange(searchParams);
  }, [searchParams, onSearchParamsChange]);

  const handleOnSearchChange = (search) => {
    setSearchParams({ ...searchParams, search });
  };

  const handleOnFilterChange = (filterName, filterValue) => {
    setSearchParams({ ...searchParams, [filterName]: filterValue });
  };

  return (
    <div>
      <StyledCocktailsSearchInput
        placeholder="Поиск"
        onChange={handleOnSearchChange}
      />
      <CocktailsFilterGroup
        filters={bases}
        value={searchParams.base}
        onFilterChange={(value) => {
          handleOnFilterChange("base", value);
        }}
      />
      <CocktailsFilterGroup
        filters={spirits}
        value={searchParams.spirit}
        onFilterChange={(value) => {
          handleOnFilterChange("spirit", value);
        }}
      />
      <CocktailsFilterGroup
        filters={groups}
        value={searchParams.group}
        onFilterChange={(value) => {
          handleOnFilterChange("group", value);
        }}
      />
      <CocktailsFilterGroup
        filters={tastes}
        value={searchParams.taste}
        onFilterChange={(value) => {
          handleOnFilterChange("taste", value);
        }}
      />
    </div>
  );
};

export default CocktailsSearch;
