import React from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { PageHeader, Breadcrumb } from "antd";

const PageHead = (props) => {
  const history = useHistory();
  let location = useLocation();
  let subtitle = "";
  if (typeof props.subtitle != "undefined") subtitle = props.subtitle;
  const routes = [
    {
      path: "index",
      breadcrumbName: "First-level Menu",
    },
    {
      path: "first",
      breadcrumbName: "Second-level Menu",
    },
    {
      path: "second",
      breadcrumbName: "Third-level Menu",
    },
  ];
  const breadCrumbFind = () => {
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{url}</Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/">Home</Link>
      </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
    console.log("item", breadcrumbItems);
    return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
  };
  return (
    <>
      <breadCrumbFind />
      <PageHeader
        className="site-page-header"
        title={props.title}
        breadcrumb={{ routes }}
        subTitle={subtitle}
      />
    </>
  );
};

export default PageHead;
