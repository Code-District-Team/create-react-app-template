// import React from 'react';
import Dashboard from '../features/dashboard/dashboard';
import Login from '../features/login/login';
import Projects from '../features/projects/projects';
import Register from '../features/register/register';
import Unauthorized from '../features/unauthorized/unauthorized';
import Users from '../features/users/users';
import GuestPageLayout from '../layout/guestPageLayout';
import LoggedInPageLayout from '../layout/loggedInPageLayout';
import K from '../utilities/constants';


// Template for a route
// {
//   path: '/login',
//   name: "Login",
//   component: Login,
//   authenticated: false,
//   roles: [],
//   children: [],
//   layout: LoggedInPageLayout
// },

const defaultCrudChildren = [
  {path: '/details/:id', name: 'Details'},
  {path: '/store/:id', name: 'Edit'}
];

const routes = [
  {
    path: '/login',
    name: "Login",
    component: Login,
    layout: GuestPageLayout,
  }, 
  {
    path: '/register',
    name: "Register",
    component: Register,
    layout: GuestPageLayout,
  }, 
  {
    path: '/projects',
    name: "Projects",
    component: Projects,
    authenticated: true,
    roles: [K.Roles.Admin],
    children: defaultCrudChildren,
    layout: LoggedInPageLayout,
  },
  {
    path: '/users',
    name: "Users",
    component: Users,
    authenticated: true,
    roles: [],
    children: defaultCrudChildren,
    layout: LoggedInPageLayout,
  },
  {
    path: '/unauthorized',
    name: "Unauthorized",
    component: Unauthorized,
    authenticated: true,
    roles: [],
    layout: GuestPageLayout,
  },
  {
    path: '/',
    name: "Dashboard",
    component: Dashboard,
    authenticated: true,
    layout: LoggedInPageLayout,
  }, 
];

export default routes;
