import { Breadcrumb, Layout } from "antd";
import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import routes from "../../routes/routes";

const createRouteMap = (routes) =>
  routes.reduce((prev, curr) => {
    prev[curr.path] = curr.name;
    if (curr.children && curr.children.length) {
      prev = { ...prev, ...createRouteMap(curr.children.map((route) => ({ ...route, path: curr.path + route.path }))) };
    }
    return prev;
  }, {});

const Breadcrumbs = () => {
  const location = useLocation();
  const breadcrumbNameMap = createRouteMap(routes);

  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {breadcrumbNameMap[Object.keys(breadcrumbNameMap).find((element) => matchPath(url, element)?.isExact)]}
        </Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <Layout.Header
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Breadcrumb separator=">">{breadcrumbItems}</Breadcrumb>
    </Layout.Header>
  );
};

export default Breadcrumbs;
