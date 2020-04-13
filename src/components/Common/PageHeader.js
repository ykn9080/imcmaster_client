import React from "react";
import { useHistory } from "react-router-dom";
import { PageHeader } from "antd";

const PageHead = (props) => {
  const history = useHistory();
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
  const onBack = () => {
    history.goBack();
  };
  return (
    <PageHeader
      className="site-page-header"
      title={props.title}
      {...(props.onBack ? { onBack: { onBack } } : {})}
      breadcrumb={{ routes }}
      subTitle={subtitle}
    />
  );
};

export default PageHead;
