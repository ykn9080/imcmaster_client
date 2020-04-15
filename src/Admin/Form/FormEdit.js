import React, { useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { DesktopOutlined, EditFilled } from "@ant-design/icons";
import PageHead from "components/Common/PageHeader";
import AntFormBuild from "components/Common/AntFormBuild";

const FormEdit = (props) => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.search); // result: '?query=abc'
    console.log(location.state); // result: 'some_value'
  }, [location]);
  console.log(location.state.data, location.state);

  const extra = [
    <Tooltip title="View">
      <Button
        shape="circle"
        icon={<DesktopOutlined />}
        onClick={() => history.push("/admin/form/formview", location.state)}
      />
    </Tooltip>,
  ];

  return (
    <>
      <PageHead title="FormEdit" onBack={true} extra={extra} />
      <AntFormBuild formArray={location.state.data} />
    </>
  );
};

export default FormEdit;
