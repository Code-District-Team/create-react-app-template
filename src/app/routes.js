import React from "react";
import { Counter } from "../features/counter/Counter";
import { Switch, Route } from "react-router-dom";
import Projects from "../features/projects/projects";
import Users from "../features/users/users";
import Login from "../features/login/login";

export default function Routes() {
  return (
    <Switch>
      <Route path="/users">
        <Users />
      </Route>
      <Route path="/projects">
        <Projects />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/">
        <Counter />
      </Route>
      
    </Switch>
  );
}
