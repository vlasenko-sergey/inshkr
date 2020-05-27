import React, { useState, useEffect } from "react";
import FilterGroup from "../FilterGroup";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../SearchInput";
import debounce from "lodash.debounce";
import styled from "styled-components";
import { fetchCocktailsProperties } from "../../features/cocktails/cocktailsPropertiesSlice";
import { useLocation } from "react-router-dom";

const StyledFilterWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const CocktailsSearch = (props) => {
  const { onSearchParamsChange } = props;
  const dispatch = useDispatch();
  const bases = useSelector((state) => state.cocktailsProperties.items.bases);
  const spirits = useSelector(
    (state) => state.cocktailsProperties.items.spirits
  );
  const groups = useSelector((state) => state.cocktailsProperties.items.groups);
  const tastes = useSelector((state) => state.cocktailsProperties.items.tastes);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const base = params.get("base");
  const [searchParams, setSearchParams] = useState({ tastes: [], base });

  useEffect(() => {
    dispatch(fetchCocktailsProperties());
  }, [dispatch]);

  useEffect(() => {
    if (onSearchParamsChange) {
      onSearchParamsChange(searchParams);
    }
  }, [searchParams, onSearchParamsChange]);

  const handleOnSearchChange = debounce((keyword) => {
    setSearchParams({ ...searchParams, keyword });
  }, 500);

  const handleOnFilterChange = (filterName, filterValue) => {
    setSearchParams({ ...searchParams, [filterName]: filterValue });
  };

  return (
    <div>
      <SearchInput placeholder="Поиск" onChange={handleOnSearchChange} />
      <StyledFilterWrapper>
        <FilterGroup
          filters={bases}
          value={searchParams.base}
          onFilterChange={(value) => {
            handleOnFilterChange("base", value);
          }}
        />
      </StyledFilterWrapper>
      <StyledFilterWrapper>
        <FilterGroup
          filters={spirits}
          value={searchParams.spirit}
          onFilterChange={(value) => {
            handleOnFilterChange("spirit", value);
          }}
        />
      </StyledFilterWrapper>
      <StyledFilterWrapper>
        <FilterGroup
          filters={groups}
          value={searchParams.group}
          onFilterChange={(value) => {
            handleOnFilterChange("group", value);
          }}
        />
      </StyledFilterWrapper>
      <StyledFilterWrapper>
        <FilterGroup
          filters={tastes}
          value={searchParams.tastes}
          multiple
          onFilterChange={(value) => {
            handleOnFilterChange("tastes", value);
          }}
        />
      </StyledFilterWrapper>
    </div>
  );
};

export default CocktailsSearch;
