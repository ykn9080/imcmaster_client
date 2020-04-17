import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { useLocation, useHistory, Link } from "react-router-dom";
import { Button, Tooltip, Row, Col, Statistic } from "antd";
import { FormOutlined, EditFilled } from "@ant-design/icons";
import PageHead from "components/Common/PageHeader";
import AntFormDisplay from "components/Common/AntFormDisplay";
import "components/Common/Antd.css";

const FormView = (props) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  dispatch(globalVariable({ formEdit: false }));
  let formdt = useSelector((state) => state.global.currentData);
  if (formdt == "") {
    formdt = location.state;
    dispatch(globalVariable({ currentData: location.state }));
  }

  console.log(formdt, location.state);
  // useEffect(() => {
  //   console.log(location.pathname); // result: '/secondpage'
  //   console.log(location.search); // result: '?query=abc'
  //   console.log(location.state); // result: 'some_value'
  //   if (location.state) {
  //     formdt = location.state;
  //     dispatch(globalVariable({ currentData: location.state }));
  //   }
  // }, []);

  const summary = formdt.data.setting;
  const extra = [
    <Tooltip title="Edit">
      <Button
        shape="circle"
        icon={<FormOutlined />}
        onClick={() => history.push("/admin/form/formedit")}
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
      <Description term="Title">{summary.name}</Description>
      <Description term="Column">{summary.colnum}</Description>
      <Description term="Size">{summary.size}</Description>
      <Description term="Layout">{summary.layout}</Description>
      <Description term="Label:Input">
        {summary.formItemLayout.labelCol.span +
          ":" +
          summary.formItemLayout.wrapperCol.span}
      </Description>
      <Description term="Description">{summary.desc}</Description>
    </Row>
  );
  const extraContent = "";
  const child = (
    <div className="wrap">
      <div className="content padding">{content}</div>
      <div className="extraContent">{extraContent}</div>
    </div>
  );

  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHead title="FormView" onBack={true} extra={extra} ghost={false}>
          {child}
        </PageHead>
      </div>
      <AntFormDisplay formArray={formdt.data} />
    </>
  );
};

export default FormView;
