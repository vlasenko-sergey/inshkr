import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledAdminPageWrapper = styled.div`
  background-color: #ffffff;
  flex-grow: 1;
  display: flex;
`;

const StyledAdminPageMenu = styled.div`
    width: 400px;
    background-color: #dcdcdc;
    flex-shrink: 0;
`;

const StyledAdminPageContent = styled.div`
    padding: 60px;
    flex-grow: 1;
`;

const StyledMenuLink = styled(Link)`
    display: block;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    letter-spacing: 0.2em;
    display: flex;
    text-transform: uppercase;
    align-items: center;
    padding: 20px;
`; 

const AdminPageWrapper = (props) => {
  return (
    <StyledAdminPageWrapper>
      <StyledAdminPageMenu>
          <StyledMenuLink to="/admin/cocktails">Коктейли</StyledMenuLink>
          <StyledMenuLink to="/admin/ingredients">Ингредиенты</StyledMenuLink>
      </StyledAdminPageMenu>
      <StyledAdminPageContent>{props.children}</StyledAdminPageContent>
    </StyledAdminPageWrapper>
  );
};

export default AdminPageWrapper;
