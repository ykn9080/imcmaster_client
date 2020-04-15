import React, { useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { Button, Tooltip, Row, Col, Statistic } from "antd";
import { FormOutlined, EditFilled } from "@ant-design/icons";
import PageHead from "components/Common/PageHeader";
import AntFormDisplay from "components/Common/AntFormDisplay";
import "components/Common/Antd.css";

const FormView = (props) => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.search); // result: '?query=abc'
    console.log(location.state); // result: 'some_value'
  }, [location]);
  console.log(location.state);
  const summary = location.state.data.setting;
  const extra = [
    <Tooltip title="Edit">
      <Button
        shape="circle"
        icon={<FormOutlined />}
        onClick={() => history.push("/admin/form/formedit", location.state)}
      />
    </Tooltip>,
  ];
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
      <Description term="Title">{location.state.name}</Description>
      <Description term="Column">{summary.colnum}</Description>

      <Description term="Size">{summary.size}</Description>
      <Description term="Layout">{summary.layout}</Description>
      <Description term="Label:Input">
        {summary.formItemLayout.labelCol.span +
          ":" +
          summary.formItemLayout.wrapperCol.span}
      </Description>
      <Description term="Description">{location.state.desc}</Description>
    </Row>
  );
  // const extraContent = (
  //   <Row>
  //     <Col span={12}>
  //       <Statistic title="Status" value="Pending" />
  //     </Col>
  //     <Col span={12}>
  //       <Statistic title="Price" prefix="$" value={568.08} />
  //     </Col>
  //   </Row>
  // );
  // const extraContent = (
  //   <img
  //     src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
  //     alt="content"
  //   />
  // );
  const extraContent = "";
  const child = (
    <div className="wrap">
      <div className="content padding">{content}</div>
      <div className="extraContent">{extraContent}</div>
    </div>
  );

  return (
    <>
      <PageHead title="FormView" onBack={true} extra={extra}>
        {child}
      </PageHead>
      <AntFormDisplay formArray={location.state.data} />
    </>
  );
};

export default FormView;
