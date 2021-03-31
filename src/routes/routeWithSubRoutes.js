import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import User from "../redux/models/user/user";
import { redirectIfInvalidTenant } from "../utilities/generalUtility";

export default function RouteWithSubRoutes(route) {
  // let { path, url } = useRouteMatch();
  // console.log(path);
  // console.log(url);
  console.log("#route ", route);

  return (
    <Route
      path={route.path}
      render={(props) => {
        console.log(route);
        // Check authentication
        if (!route.authenticated || (route.authenticated && User.isTokenAvailable())) {
          // Check domain prefix
          redirectIfInvalidTenant();
          if (
            (route.path === "/login" || route.path === "/forgot-password" || route.path === "/set-password") &&
            User.isTokenAvailable()
          )
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location },
                }}
              />
            );
          // Check roles
          // const hasRole = isRolePresent(route.roles, User.roles());
          const hasRole = true;
          if (hasRole) {
            let component = <route.component {...props} route={route}></route.component>;
            if (route.children && route.children.length) {
              let { children, layout, ...props } = route;
              console.log("#props : ", props);

              component = (
                <Switch>
                  {RouteWithSubRoutes(props)}
                  {/* {children.map((route) => RouteWithSubRoutes({ ...route, path: path }))} */}
                  {children.map((route) => RouteWithSubRoutes({ ...route }))}
                </Switch>
              );

              console.log(`11111111111111111111111111111111`);
              console.log("#component :", component);
              console.log(`11111111111111111111111111111111`);
            }
            return route.layout ? <route.layout>{component}</route.layout> : component;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/unauthorized",
                }}
              />
            );
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}
