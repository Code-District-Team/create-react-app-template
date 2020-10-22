import React from "react";
import User from '../models/user/user';
import { Redirect, Route } from "react-router-dom";


export default function RouteWithSubRoutes(route) {

    return (
    <Route
        path={route.path}
        render={props => {
            debugger;
            // Check authentication
            if (!route.authenticated || (route.authenticated && User.isAuthenticated())) {

                // Check roles
                let hasRole = true;
                if (route.roles && route.roles.length > 0) {
                    let roleFound = false;
                    for (const routeRole of route.roles ?? []) {
                        if (User.roles().includes(routeRole)) {
                            roleFound = true;
                            break;
                        }
                    }
                    hasRole = roleFound;
                }
                
                if (hasRole) {
                    const component = <route.component {...props} route={route} ></route.component>;
                    return route.layout ? <route.layout>{component}</route.layout> : component;
                } else {
                    return <Redirect
                        to={{
                            pathname: '/unauthorized',
                        }}
                    />
                }
                
            } else {
                return <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            }

            
        }}
    />
    );
}