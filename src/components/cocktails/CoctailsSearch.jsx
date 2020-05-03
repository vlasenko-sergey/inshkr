import React, { useState, useEffect } from "react";
import FilterGroup from "../FilterGroup";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktailsBases } from "../../features/cocktails/cocktailsBasesSlice";
import { fetchCocktailsSpirits } from "../../features/cocktails/cocktailsSpiritsSlice";
import { fetchCocktailsGroups } from "../../features/cocktails/cocktailsGroupsSlice";
import { fetchCocktailsTastes } from "../../features/cocktails/cocktailsTastesSlice";
import SearchInput from "../SearchInput";
import debounce from "lodash.debounce";


const CocktailsSearch = (props) => {
  const { onSearchParamsChange } = props;
  const dispatch = useDispatch();
  const bases = useSelector((state) => state.cocktailsBases);
  const spirits = useSelector((state) => state.cocktailsSpirits);
  const groups = useSelector((state) => state.cocktailsGroups);
  const tastes = useSelector((state) => state.cocktailsTastes);

  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    dispatch(fetchCocktailsBases());
    dispatch(fetchCocktailsSpirits());
    dispatch(fetchCocktailsGroups());
    dispatch(fetchCocktailsTastes());
  }, [dispatch]);

  useEffect(() => {
    onSearchParamsChange(searchParams);
  }, [searchParams, onSearchParamsChange]);

  const handleOnSearchChange = debounce((search) => {
    setSearchParams({ ...searchParams, search });
  }, 500);

  const handleOnFilterChange = (filterName, filterValue) => {
    setSearchParams({ ...searchParams, [filterName]: filterValue });
  };

  return (
    <div>
      <SearchInput
        placeholder="Поиск"
        onChange={handleOnSearchChange}
      />
      <FilterGroup
        filters={bases}
        value={searchParams.base}
        onFilterChange={(value) => {
          handleOnFilterChange("base", value);
        }}
      />
      <FilterGroup
        filters={spirits}
        value={searchParams.spirit}
        onFilterChange={(value) => {
          handleOnFilterChange("spirit", value);
        }}
      />
      <FilterGroup
        filters={groups}
        value={searchParams.group}
        onFilterChange={(value) => {
          handleOnFilterChange("group", value);
        }}
      />
      <FilterGroup
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