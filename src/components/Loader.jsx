import React from "react";
import styled from "styled-components";

const StyledLoader = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const Loader = () => {
  return (
    <StyledLoader>
      <div class="loader">
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div class="wineglass left">
          <div class="top"></div>
        </div>
        <div class="wineglass right">
          <div class="top"></div>
        </div>
      </div>
    </StyledLoader>
  );
};

export default Loader;
