import React from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { PageHeader, Breadcrumb } from "antd";
import AntBreadCrumb from "./BreadCrumb";

const PageHead = (props) => {
  const history = useHistory();
  let location = useLocation();
  console.log(location);

  let subtitle = "";

  if (typeof props.subtitle != "undefined") subtitle = props.subtitle;
  //   const routes = [
  //     {
  //       path: "index",
  //       breadcrumbName: "First-level Menu",
  //     },
  //     {
  //       path: "first",
  //       breadcrumbName: "Second-level Menu",
  //     },
  //     {
  //       path: "second",
  //       breadcrumbName: "Third-level Menu",
  //     },
  //   ];

  const onBack = () => {
    history.goBack();
  };
  return (
    <>
      <AntBreadCrumb />
      <PageHeader
        className="site-page-header"
        title={props.title}
        {...(props.onBack ? { onBack: { onBack } } : {})}
        //{...(props.routes ? { breadcrumb: { routes } } : {})}
        // breadcrumb={{ routes }}
        subTitle={subtitle}
      />
    </>
  );
};

export default PageHead;
