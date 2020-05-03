import React from "react";
import styled from "styled-components";

const StyledCocktailsFilterGroup = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCocktailsFilter = styled.div`
  background: ${({ State }) => (State === "active" && "#E6E6E6") || "#ffffff"};
  border: 0.7px solid #333333;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 4px 9px;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  cursor: pointer;
  margin-right: 5px;
`;

const CocktailsFilterGroup = (props) => {
  const { value, onFilterChange, filters } = props;

  const handleFilterClick = (newValue) => {
    onFilterChange(value === newValue ? "" : newValue);
  };

  return (
    <StyledCocktailsFilterGroup>
      {filters.map((filter, index) => (
        <StyledCocktailsFilter
          key={index}
          State={value === filter && "active"}
          onClick={() => handleFilterClick(filter)}
        >
          {filter}
        </StyledCocktailsFilter>
      ))}
    </StyledCocktailsFilterGroup>
  );
};

export default CocktailsFilterGroup;
