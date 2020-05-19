import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminApp from "./AdminApp";
import UserApp from "./UserApp";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin">
          <AdminApp />
        </Route>
        <Route path="/">
          <UserApp />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
