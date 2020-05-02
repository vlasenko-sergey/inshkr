import React, { useState, useEffect } from "react";
import FilterGroup from "../FilterGroup";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../SearchInput";
import { fetchIngredientsSpirits } from "../../features/ingredients/ingredientsSpiritsSlice";
import { fetchIngredientssGroups } from "../../features/ingredients/ingredientsGroupsSlice";
import { fetchIngredientsTastes } from "../../features/ingredients/ingredientsTastesSlice";
import styled from "styled-components";

const StyledFilterWrapper = styled.div`
  margin-top: 20px;
`;

const IngredientsSearch = (props) => {
  const { onSearchParamsChange } = props;
  const dispatch = useDispatch();
  const spirits = useSelector((state) => state.ingredientsSpirits);
  const groups = useSelector((state) => state.ingredientsGroups);
  const tastes = useSelector((state) => state.ingredientsTastes);

  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    dispatch(fetchIngredientsSpirits());
    dispatch(fetchIngredientssGroups());
    dispatch(fetchIngredientsTastes());
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
          value={searchParams.taste}
          onFilterChange={(value) => {
            handleOnFilterChange("taste", value);
          }}
        />
      </StyledFilterWrapper>
    </div>
  );
};

export default IngredientsSearch;
