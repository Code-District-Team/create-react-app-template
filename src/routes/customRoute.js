import _ from "lodash";
import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import User from "../redux/models/user/user";
import { redirectIfInvalidTenant } from "../utilities/generalUtility";

const AuthCheck = ({ authenticated, path, roles, children }) => {
  const location = useLocation();
  if (!authenticated || (authenticated && User.isTokenAvailable())) {
    // Check domain prefix
    redirectIfInvalidTenant();
    if ((path === "/login" || path === "/forgot-password" || path === "/set-password") && User.isTokenAvailable())
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location },
          }}
        />
      );
    // Check roles
    // const hasRole = isRolePresent(roles, User.roles());
    const hasRole = true;
    if (hasRole) {
      return children;
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
          state: { from: location },
        }}
      />
    );
  }
};

const CustomRoute = ({ children, ...props }) => {
  let { path, exact, component } = props;
  if (children && children.length) {
    component = (
      <Route path={path}>
        <Switch>
          {children.map((route, i) => (
            <CustomRoute key={i} {..._.omit(props, ["layout"])} {...route} path={path + route.path} />
          ))}
        </Switch>
      </Route>
    );
  } else {
    let Component = component;
    component = (
      <AuthCheck {...props}>
        <Route path={path} exact={exact ?? false}>
          <Component />
        </Route>
      </AuthCheck>
    );
  }
  return props.layout ? <props.layout>{component}</props.layout> : component;
};

export default CustomRoute;
