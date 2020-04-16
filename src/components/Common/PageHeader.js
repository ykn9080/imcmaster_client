import React, { useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import $ from "jquery";
import { PageHeader, Breadcrumb, Row, Col, Statistic } from "antd";
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
  if (typeof props.ghost != "undefined")
    pageProps = { ...pageProps, ghost: props.ghost };
  if (props.subTitle) pageProps = { ...pageProps, subTitle: props.subtitle };
  if (props.extra) pageProps = { ...pageProps, extra: props.extra };

  /* #region  children component example*/
  const Description = ({ term, children, span = 12 }) => (
    <Col span={span}>
      <div className="description">
        <div className="term">{term}</div>
        <div className="detail">{children}</div>
      </div>
    </Col>
  );
  const content = (
    <Row>
      <Description term="Created">Lili Qu</Description>
      <Description term="Association">
        <a>421421</a>
      </Description>
      <Description term="Creation Time">2017-01-10</Description>
      <Description term="Effective Time">2017-10-10</Description>
      <Description term="Remarks" span={24}>
        Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
      </Description>
    </Row>
  );
  const extraContent = (
    <img
      src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
      alt="content"
    />
  );
  const child = (
    <div className="wrap">
      <div className="content padding">{content}</div>
      <div className="extraContent">{extraContent}</div>
    </div>
  );
  /* #endregion */

  return (
    <>
      <div style={{ paddingLeft: 25, paddingTop: 5 }}>
        <AntBreadCrumb />
      </div>
      <PageHeader {...pageProps}>{props.children}</PageHeader>
    </>
  );
};

export default PageHead;
