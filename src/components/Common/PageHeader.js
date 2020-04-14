import React, { useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import $ from "jquery";
import { PageHeader, Breadcrumb } from "antd";
import AntBreadCrumb from "./BreadCrumb";

const PageHead = (props) => {
  const history = useHistory();
  let location = useLocation();
  console.log(location);

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
  // useEffect(() => {
  //   $(".ant-page-header>.ant-breadcrumb").remove();
  //   $(".ant-page-header").prepend($(".ant-breadcrumb"));
  // }, []);

  const onBack = () => {
    history.goBack();
  };
  let pageProps = {
    className: "site-page-header",
    title: props.title,
  };
  if (props.onBack) pageProps = { ...pageProps, onBack: onBack };
  if (typeof props.subTitle != "undefined")
    pageProps = { ...pageProps, subTitle: props.subtitle };

  return (
    <>
      <div style={{ paddingLeft: 25, paddingTop: 5 }}>
        <AntBreadCrumb />
      </div>
      <PageHeader {...pageProps} />
    </>
  );
};

export default PageHead;
