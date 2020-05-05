import React from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CocktailsPage } from "./components/pages/CocktailsPage";
import { CocktailPage } from "./components/pages/CocktailPage";
import PageWrapper from "./components/PageWrapper";
import { IngredientsPage } from "./components/pages/IngredientsPage";
import { IngredientPage } from "./components/pages/IngredientPage";
import { BarIngredientsPage } from "./components/pages/BarIngredientsPage";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <PageWrapper>
        <Switch>
          <Route exact path="/cocktails">
            <CocktailsPage />
          </Route>
          <Route exact path="/cocktails/:id">
            <CocktailPage />
          </Route>
          <Route exact path="/ingredients">
            <IngredientsPage />
          </Route>
          <Route exact path="/ingredients/:id">
            <IngredientPage />
          </Route>
          <Route exact path="/bar/ingredients">
            <BarIngredientsPage />
          </Route>
        </Switch>
      </PageWrapper>
      <Footer />
    </Router>
  );
}

export default App;
