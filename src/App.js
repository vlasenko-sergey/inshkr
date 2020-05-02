import React from 'react';
import './App.css';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { HomePage } from './components/pages/HomePage';
import { CocktailPage } from './components/pages/CocktailPage';
import PageWrapper from './components/PageWrapper';

function App() {
  return (
    <Router>
      <Header />
      <PageWrapper>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/cocktails/:id">
            <CocktailPage />
          </Route>
        </Switch>
      </PageWrapper>
    </Router>
  );
}

export default App;
