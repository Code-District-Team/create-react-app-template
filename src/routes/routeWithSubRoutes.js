import React from "react";
import User from "models/user/user";
import { Navigate } from "react-router-dom";
import {
  isRolePresent,
  redirectIfInvalidTenant,
} from "utilities/generalUtility";

export default function RouteWithSubRoutes({ route }) {
  if (
    !route.authenticated ||
    (route.authenticated && User.isTokenAvailable())
  ) {
    // Check domain prefix
    redirectIfInvalidTenant();
    if (
      ["/login", "/forgot-password", "/set-password"].includes(route.path) &&
      User.isTokenAvailable()
    )
      return (
        <Navigate
          replace
          to={{ pathname: "/", state: { from: route.location } }}
        />
      );
    // Check roles
    const hasRole = isRolePresent(route.roles, User.roles());

    if (hasRole) {
      const component = (
        <route.component {...route} route={route}></route.component>
      );
      return route.layout ? (
        <route.layout>{component}</route.layout>
      ) : (
        component
      );
    } else {
      return <Navigate replace to={{ pathname: "/unauthorized" }} />;
    }
  } else {
    return (
      <Navigate
        replace
        to={{ pathname: "/login", state: { from: route.location } }}
      />
    );
  }
}
