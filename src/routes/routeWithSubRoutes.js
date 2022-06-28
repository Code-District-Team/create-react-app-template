import React from "react";
import User from "../models/user/user";
import { Redirect, Route } from "react-router-dom";
import { isRolePresent } from "../utilities/generalUtility";

export default function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => {
        console.log(route);
        console.log({ token: User.isTokenAvailable() });
        // Check authentication
        if (
          !route.authenticated ||
          (route.authenticated && User.isTokenAvailable())
        ) {
          if (
            ["/login", "/forgot-password", "/set-password"].includes(
              route.path
            ) &&
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
          const hasRole = isRolePresent(route.roles, User.roles());

          if (hasRole) {
            const component = (
              <route.component {...props} route={route}></route.component>
            );
            return route.layout ? (
              <route.layout>{component}</route.layout>
            ) : (
              component
            );
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
