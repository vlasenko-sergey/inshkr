import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import AdminCocktailsPage from "./components/pages/admin/AdminCocktailsPage";
import { CocktailPage } from "./components/pages/CocktailPage";
import AdminCreateCocktailPage from "./components/pages/admin/AdminCreateCocktailPage";
import AdminPageWrapper from "./components/admin/AdminPageWrapper";
import { AdminIngredientsPage } from "./components/pages/admin/AdminIngredientsPage";
import AdminCreateItemPage from "./components/pages/admin/AdminCreateItemPage";
import { IngredientPage } from "./components/pages/IngredientPage";

function AdminApp() {
  return (
    <AdminPageWrapper>
      <Switch>
        <Route exact path="/admin/cocktails">
          <AdminCocktailsPage />
        </Route>
        <Route exact path="/admin/cocktails/create">
          <AdminCreateCocktailPage />
        </Route>
        <Route exact path="/admin/cocktails/:id">
          <CocktailPage />
        </Route>
        <Route exact path="/admin/cocktails/:id/edit">
          <AdminCreateCocktailPage />
        </Route>
        <Route exact path="/admin/ingredients/:id/edit">
          <AdminCreateItemPage type="ingredient" />
        </Route>
        <Route exact path="/admin/tableware/:id/edit">
          <AdminCreateItemPage type="tableware" />
        </Route>
        <Route exact path="/admin/garnish/:id/edit">
          <AdminCreateItemPage type="garnish" />
        </Route>
        <Route exact path="/admin/ingredients">
          <AdminIngredientsPage />
        </Route>
        <Route exact path="/admin/ingredients/create">
          <AdminCreateItemPage type="ingredient" />
        </Route>
        <Route exact path="/admin/tableware/create">
          <AdminCreateItemPage type="tableware" />
        </Route>
        <Route exact path="/admin/garnish/create">
          <AdminCreateItemPage type="garnish" />
        </Route>
        <Route exact path="/admin/ingredient/:id">
          <IngredientPage type="ingredient" />
        </Route>
        <Route exact path="/admin/tableware/:id">
          <IngredientPage type="tableware" />
        </Route>
        <Route exact path="/admin/garnish/:id">
          <IngredientPage type="garnish" />
        </Route>
      </Switch>
    </AdminPageWrapper>
  );
}

export default AdminApp;
