import React from "react";
import User from '../models/user/user';
import { Redirect, Route } from "react-router-dom";
import { isRolePresent } from '../utilities/generalUtility';


export default function RouteWithSubRoutes(route) {

    return (
    <Route
        path={route.path}
        render={props => {
            debugger;
            // Check authentication
            if (!route.authenticated || (route.authenticated && User.isAuthenticated())) {

                // Check roles
                const hasRole = isRolePresent(route.roles, User.roles());
                
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