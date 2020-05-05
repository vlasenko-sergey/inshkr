import React from "react";
import styled from "styled-components";

const StyledFilterGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledFilter = styled.div`
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
  white-space: nowrap;
  margin-bottom: 5px;
`;

const FilterGroup = (props) => {
  const { value, onFilterChange, filters } = props;

  const handleFilterClick = (newValue) => {
    onFilterChange(value === newValue ? "" : newValue);
  };

  return (
    <StyledFilterGroup>
      {filters.map((filter, index) => (
        <StyledFilter
          key={index}
          State={value === filter && "active"}
          onClick={() => handleFilterClick(filter)}
        >
          {filter}
        </StyledFilter>
      ))}
    </StyledFilterGroup>
  );
};

export default FilterGroup;
