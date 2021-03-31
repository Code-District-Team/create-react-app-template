import GuestPageLayout from "../layout/guestPageLayout";
import LoggedInPageLayout from "../layout/loggedInPageLayout";
import Dashboard from "../pages/dashboard/dashboard";
import ForgotPassword from "../pages/forgotPassword/forgotPassword";
import Login from "../pages/login/login";
import NotFound from "../pages/notFound/notFound";
import Projects from "../pages/projects/projects";
import Register from "../pages/register/register";
import SetPassword from "../pages/setPassword/setPassword";
import Unauthorized from "../pages/unauthorized/unauthorized";
import Users from "../pages/users/users";
import K from "../utilities/constants";

// Template for a route
// {
//   path: '/login',
//   name: "Login",
//   component: Login,
//   authenticated: false,
//   roles: [],
//   children: [],
//   exact: true,
//   layout: LoggedInPageLayout
// },

const defaultCrudChildren = [
  { path: "/details/:id", name: "Details" },
  { path: "/store/:id", name: "Edit" },
];

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: GuestPageLayout,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    layout: GuestPageLayout,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    layout: GuestPageLayout,
  },
  {
    path: "/set-password",
    name: "SetPassword",
    component: SetPassword,
    layout: GuestPageLayout,
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
    authenticated: true,
    roles: [K.Roles.Admin],
    exact: true,
    children: defaultCrudChildren,
    layout: LoggedInPageLayout,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    authenticated: true,
    roles: [],
    children: defaultCrudChildren,
    layout: LoggedInPageLayout,
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: Unauthorized,
    authenticated: true,
    roles: [],
    layout: GuestPageLayout,
  },
  {
    path: "/",
    name: "Dashboard",
    exact: true,
    component: Dashboard,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "*",
    name: "Not Found",
    component: NotFound,
    layout: GuestPageLayout,
  },
];

export default routes;
