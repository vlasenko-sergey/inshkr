import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AdminTileItem from "../AdminTileItem";

const StyledCocktailsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const StyleCocktailsListItem = styled.div`
  width: calc(25% - 20px);
  margin: 0 10px 40px 10px;
  position: relative;
`;

const AdminCocktailsList = (props) => {
  const { cocktails } = props;

  return (
    <StyledCocktailsList>
      {cocktails.map((cocktail) => (
        <StyleCocktailsListItem key={cocktail.id}>
          <Link to={`/admin/cocktails/${cocktail.id}`}>
            <AdminTileItem item={cocktail} type={"cocktail"} />
          </Link>
        </StyleCocktailsListItem>
      ))}
    </StyledCocktailsList>
  );
};

export default AdminCocktailsList;
