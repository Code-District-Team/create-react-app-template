import React from "react";
import { useLocation, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.scss";
import routes from "../routes/routes";
import RouteWithSubRoutes from "../routes/routeWithSubRoutes";

function App() {

  return (
    <div className="App">
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
  
}

export default App;
