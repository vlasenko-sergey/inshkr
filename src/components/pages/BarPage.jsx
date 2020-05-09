import React from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { BarIngredientsPage } from "./BarIngredientsPage";
import BarCocktailsPage from "./BarCocktailsPage";

const BarPage = () => {
  return (
    <div>
      <Redirect to="/bar/cocktails" />
      <div>
        <Link to="/bar/cocktails">Коктейли</Link>
        <Link to="/bar/ingredients">Ингредиенты</Link>
      </div>
      <Switch>
        <Route exact path="/bar/ingredients">
          <BarIngredientsPage />
        </Route>
        <Route exact path="/bar/cocktails">
          <BarCocktailsPage />
        </Route>
      </Switch>
    </div>
  );
};

export default BarPage;
