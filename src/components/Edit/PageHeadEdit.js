import React from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { makeStyles } from "@material-ui/core/styles";
import { directChild } from "components/functions/findChildrens";
import PageHead from "components/Common/PageHeader";
import { Tooltip, Button } from "antd";
import { FormOutlined } from "@ant-design/icons";
import "components/Common/Antd.css";
import { SubMenu } from "./SubMenu";

import useForceUpdate from "use-force-update";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(10),
  },
  sortable: {
    margin: 0,
  },
}));

export const PageHeadEdit = (props) => {
  let topMenu,
    title = "";
  if (props.title) title = props.title;
  const forceUpdate = useForceUpdate();
  let tempMenu = useSelector((state) => state.global.tempMenu);
  const control = useSelector((state) => state.global.control);
  let selectedKey = useSelector((state) => state.global.selectedKey);
  let menuList = directChild(tempMenu, "", "seq");
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  let currdt = _.filter(tempMenu, function (o) {
    return o._id == selectedKey;
  });
  if (currdt.length > 0) currdt = currdt[0];

  const onSave = () => {
    //setState의 모든 내용을 redux에 반영한후 display page로 이동
    dispatch(globalVariable({ menu: tempMenu }));
  };

  const classes = useStyles();
  const history = useHistory();

  const sum = { name: "sss", column: "2", size: "5", desc: "hhh" };
  const content = [
    { term: "Title", detail: sum.name },
    { term: "Column", detail: sum.column },
    { term: "Size", detail: sum.size },
    { term: "Layout", detail: sum.layout },
    { term: "Description", detail: sum.desc, span: 24 },
  ];

  const extra = [
    <Tooltip title="Edit">
      <Button
        shape="circle"
        icon={<FormOutlined />}
        onClick={() => history.push("/admin/form/formedit")}
      />
    </Tooltip>,
  ];
  const extraContent = (
    <div
      style={{
        display: "flex",
        width: "max-content",
        justifyContent: "flex-end",
      }}
    >
      {/* <SubMenu selectedmenu={selectedmenu} tempMenu={tempMenu} /> */}
    </div>
  );

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHead
        title={title}
        extra={extra}
        content={content}
        extraContent={extraContent}
        ghost={false}
        span={12}
      >
        {isEdit && <AntFormDisplay formArray={summaryData} name={"fsummary"} />}
      </PageHead>
    </div>
  );
};

export default PageHeadEdit;
