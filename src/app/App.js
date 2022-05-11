import React from "react";
import { Switch } from "react-router-dom";
import "./App.less";
import routes from "../routes/routes";
import RouteWithSubRoutes from "../routes/routeWithSubRoutes";
import ErrorBoundary from "../common/components/errorBoundary/errorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes
              key={i}
              {...route}
              exact={route.exact ?? false}
            />
          ))}
        </Switch>
      </div>
    </ErrorBoundary>
  );
}

export default App;
