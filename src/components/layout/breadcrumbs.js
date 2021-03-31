import { Breadcrumb } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../../routes/routes";

const Breadcrumbs = () => {
  const location = useLocation();
  const breadcrumbNameMap = routes.reduce((prev, curr) => {
    prev[curr.path] = curr.name;
    return prev;
  }, {});

  console.log("--------------------------");
  console.log(location);
  console.log("--------------------------");

  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
};

export default Breadcrumbs;
