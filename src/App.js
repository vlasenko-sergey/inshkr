import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminApp from "./AdminApp";
import UserApp from "./UserApp";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/users/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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
