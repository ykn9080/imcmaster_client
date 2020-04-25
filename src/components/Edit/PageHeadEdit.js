import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { makeStyles } from "@material-ui/core/styles";
import { directChild } from "components/functions/findChildrens";
import PageHead from "components/Common/PageHeader";
import { Tooltip, Button } from "antd";
import { FormOutlined } from "@ant-design/icons";
import "components/Common/Antd.css";
import { SubMenu } from "./SubMenu";
import AntFormDisplay from "components/Common/AntFormDisplay";

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
  const summaryData = {
    setting: {
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
      },
      layout: "horizontal",
      formColumn: 1,
      size: "middle",
      initialValues: {
        title: currdt.title,
        desc: currdt.desc,
      },

      onValuesChange: (changedValues, allValues) => {
        currdt.title = allValues.title;
        currdt.desc = allValues.desc;

        var index = _.findIndex(tempMenu, { _id: selectedKey });

        // Replace item at index using native splice
        tempMenu.splice(index, 1, currdt);
        dispatch(globalVariable({ tempMenu: tempMenu }));
        //forceUpdate();
      },
      onFinish: (values) => {
        console.log("Received values of form: ", values);
      },
      onFinishFailed: (values, errorFields, outOfDate) => {
        console.log(values, errorFields, outOfDate);
      },
    },
    list: [
      { label: "Title", name: "title", type: "input", seq: 0 },
      {
        label: "Desc",
        name: "desc",
        type: "input.textarea",
        seq: 1,
      },
    ],
  };
  const content = [
    { term: "Title", detail: currdt.title },
    { term: "Desc", detail: currdt.desc },
  ];
  const renderContent = (column = 2) => (
    <Descriptions size="small" column={column}>
      <Descriptions.Item label="Title">{currdt.title}</Descriptions.Item>
      <Descriptions.Item label="Desc">{currdt.desc}</Descriptions.Item>
    </Descriptions>
  );
  const extra = [
    <Tooltip title="Edit">
      <Button
        shape="circle"
        icon={<FormOutlined />}
        onClick={() => {
          setIsEdit(true);
          console.log("clicked...");
        }}
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
        // content={content}
        extraContent={extraContent}
        ghost={false}
        span={12}
      >
        {isEdit ? (
          <AntFormDisplay formArray={summaryData} name={"menuEdit"} />
        ) : null}
      </PageHead>
    </div>
  );
};

export default PageHeadEdit;
