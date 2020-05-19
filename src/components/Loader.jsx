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
  background-color: rgba(0,0,0,0.2);
`;

const Loader = () => {
  return (
    <StyledLoader>
      <div className="loader">
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div className="wineglass left">
          <div className="top"></div>
        </div>
        <div className="wineglass right">
          <div className="top"></div>
        </div>
      </div>
    </StyledLoader>
  );
};

export default Loader;
