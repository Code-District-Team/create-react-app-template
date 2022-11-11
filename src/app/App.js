import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.less";
import routes from "routes/routes";
import RouteWithSubRoutes from "routes/routeWithSubRoutes";
import ErrorBoundary from "common/components/errorBoundary/errorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Routes>
          {routes.map((route, i) => 
            <Route key={i} path={route.path} element={<RouteWithSubRoutes route={route}/>} />
          )}
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
