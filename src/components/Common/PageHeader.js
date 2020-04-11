import React from "react";
import { PageHeader } from "antd";

const PageHead = (props) => {
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
  return (
    <PageHeader
      className="site-page-header"
      title={props.title}
      breadcrumb={{ routes }}
      subTitle={subtitle}
    />
  );
};

export default PageHead;
