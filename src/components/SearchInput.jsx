import React from "react";
import styled from "styled-components";

const StyledSearchInput = styled.input`
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

const SearchInput = () => {
  return <StyledSearchInput></StyledSearchInput>;
};

export default SearchInput;
