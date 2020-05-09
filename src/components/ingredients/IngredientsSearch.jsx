import React, { useState, useEffect } from "react";
import FilterGroup from "../FilterGroup";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../SearchInput";
import styled from "styled-components";
import { fetchIngredientsProperties } from "../../features/ingredients/ingredientsPropertiesSlice";
import debounce from "lodash.debounce";

const StyledFilterWrapper = styled.div`
  margin-top: 20px;
`;

const IngredientsSearch = (props) => {
  const { onSearchParamsChange } = props;
  const dispatch = useDispatch();
  const spirits = useSelector((state) => state.ingredientsProperties.items.spirits);
  const groups = useSelector((state) => state.ingredientsProperties.items.groups);
  const tastes = useSelector((state) => state.ingredientsProperties.items.tastes);

  const [searchParams, setSearchParams] = useState({tastes: []});

  useEffect(() => {
    dispatch(fetchIngredientsProperties());
  }, [dispatch]);

  useEffect(() => {
    onSearchParamsChange(searchParams);
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
          onFilterChange={(value) => {
            handleOnFilterChange("tastes", value);
          }}
          multiple
        />
      </StyledFilterWrapper>
    </div>
  );
};

export default IngredientsSearch;
