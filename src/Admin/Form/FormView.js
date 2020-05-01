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
  const sum = formdt.data.setting;
  const content = [
    { term: "Title", detail: formdt.name },
    { term: "Column", detail: sum.formColumn },
    { term: "Size", detail: sum.size },
    { term: "Layout", detail: sum.layout },
    { term: "LabelWidth", detail: sum.formItemLayout.labelCol.span },
    { term: "Description", detail: sum.desc, span: 24 },
  ];
  console.log(formdt, sum, content);

  const extra = [
    <Tooltip title="Edit">
      <Button
        shape="circle"
        icon={<FormOutlined />}
        onClick={() => history.push("/admin/control/form/formedit")}
      />
    </Tooltip>,
  ];

  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHead
          title="FormView"
          onBack={true}
          extra={extra}
          content={content}
          ghost={false}
          span={12}
        ></PageHead>
      </div>
      <AntFormDisplay formArray={formdt.data} />
    </>
  );
};

export default FormView;
