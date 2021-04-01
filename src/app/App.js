import React from "react";
import { Switch } from "react-router-dom";
import CustomRoute from "../routes/customRoute";
import routes from "../routes/routes";
import "./App.less";

function App() {
  return (
    <div className="App">
      <Switch>
        {routes.map((route, i) => (
          <CustomRoute key={i} {...route} exact={route.exact ?? false} />
        ))}
      </Switch>
    </div>
  );
}

export default App;
