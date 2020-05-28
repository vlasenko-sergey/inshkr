import React from "react";
import styled from "styled-components";

const StyledFilterGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-grow: 1;
  align-items: center;
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
  const { value, onFilterChange, filters, multiple } = props;

  const handleFilterClick = (newValue) => {
    if (multiple) {
      const index = value.findIndex((item) => Number(item) === newValue);
      if (index > -1) {
        const newValueArray = [...value];
        newValueArray.splice(index, 1);
        onFilterChange(newValueArray);
      } else {
        onFilterChange([...value, newValue]);
      }
    } else {
      onFilterChange(Number(value) === newValue ? null : newValue);
    }
  };

  const isFilterActive = (filter) => {
    if (multiple) {
      return value && value.includes(filter.id);
    }
    return Number(value) === filter.id;
  };

  return (
    <StyledFilterGroup>
      {filters.map((filter, index) => (
        <StyledFilter
          key={index}
          State={isFilterActive(filter) && "active"}
          onClick={() => handleFilterClick(filter.id)}
        >
          {filter.name}
        </StyledFilter>
      ))}
    </StyledFilterGroup>
  );
};

export default FilterGroup;
