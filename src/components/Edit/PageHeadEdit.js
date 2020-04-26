import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import _ from "lodash";
import cloneDeep from "lodash/cloneDeep";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { makeStyles } from "@material-ui/core/styles";
import { directChild } from "components/functions/findChildrens";
import { useConfirm } from "material-ui-confirm";
import PageHead from "components/Common/PageHeader";
import { Tooltip, Button, Descriptions, Row, Popconfirm, message } from "antd";
import {
  FormOutlined,
  DesktopOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "components/Common/Antd.css";
import { SubMenu } from "./SubMenu";
import AntFormDisplay from "components/Common/AntFormDisplay";
import TreeAnt from "components/Common/TreeAnt";
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
    title = "",
    pid = "",
    keyfortree = "";
  const forceUpdate = useForceUpdate();
  const confirm = useConfirm();
  let tempMenu = useSelector((state) => state.global.tempMenu);
  let selectedKey = useSelector((state) => state.global.selectedKey);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  let currdt = _.filter(tempMenu, function (o) {
    return o._id == selectedKey;
  });

  if (currdt.length > 0) {
    currdt = currdt[0];
    title = currdt.title;
    pid = currdt.pid;
  }
  if (pid != "") {
    let pdt = _.filter(tempMenu, function (o) {
      return o._id == pid;
    });
    if (pdt.pid === "") keyfortree = pdt._id;
  } else keyfortree = selectedKey;
  // const findTopLevelKey = (selecteKey) => {
  //   let currdt = _.filter(tempMenu, function (o) {
  //     return o._id == selectedKey;
  //   });
  //   if (currdt.pid != "") findTopLevelKey(currdt.pid);
  //   else return currdt.pid;
  // };
  const onSave = () => {
    //setState의 모든 내용을 redux에 반영한후 display page로 이동
    dispatch(globalVariable({ menu: tempMenu }));
  };

  const classes = useStyles();
  const history = useHistory();
  const summaryData = {
    setting: {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },
      layout: "vertical",
      formColumn: 1,
      size: "small",
      initialValues: {
        title: currdt.title,
        desc: currdt.desc,
      },
      onFinish: (values) => {
        let patharr = currdt.path.split("/");
        patharr.splice(patharr.length - 1, 1, values.title);
        patharr = patharr.join("/");
        currdt = { ...currdt, ...values, path: patharr };
        var index = _.findIndex(tempMenu, { _id: selectedKey });
        //console.log("Received values of form: ", values, currdt);
        // Replace item at index using native splice
        let temp = cloneDeep(tempMenu);
        temp.splice(index, 1, currdt);
        dispatch(globalVariable({ tempMenu: temp }));
        forceUpdate();
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
      {
        type: "button",
        seq: 1000,
        btnArr: [
          {
            btnLabel: "Submit",
            btnStyle: "primary",
            htmlType: "submit",
            seq: 0,
          },
          {
            btnLabel: "Cancel",
            btnStyle: "secondary",
            htmlType: "button",
            onClick: () => {
              setIsEdit(!isEdit);
            },
            seq: 1,
          },
        ],
      },
    ],
  };
  const content = [
    { term: "Title", detail: currdt.title },
    { term: "Desc", detail: currdt.desc },
  ];
  const renderContent = (column = 1) => (
    <Descriptions size="small" column={column}>
      <Descriptions.Item label="Title">{currdt.title}</Descriptions.Item>
      <Descriptions.Item label="Desc">{currdt.desc}</Descriptions.Item>
    </Descriptions>
  );
  const extra = [
    <Tooltip title={isEdit ? "View" : "Edit"}>
      <Button
        shape="circle"
        icon={isEdit ? <DesktopOutlined /> : <FormOutlined />}
        onClick={() => {
          setIsEdit(!isEdit);
        }}
      />
    </Tooltip>,
    <Tooltip title="Delete">
      <Popconfirm
        title="Are you sure to delete ?"
        onConfirm={() => {
          var index = _.findIndex(tempMenu, { _id: selectedKey });
          let temp = cloneDeep(tempMenu);
          temp.splice(index, 1);
          dispatch(globalVariable({ tempMenu: temp }));
        }}
        okText="Yes"
        cancelText="No"
      >
        <Button shape="circle" icon={<DeleteOutlined />} />
      </Popconfirm>
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
  const Content = ({ children, extraContent }) => {
    return (
      <Row>
        <div style={{ flex: 3, paddingRight: 5 }}>{extraContent}</div>
        <div style={{ flex: 3 }}>{children}</div>
      </Row>
    );
  };
  const onSelect = (key) => {
    if (key.length > 0) history.push(key[0].path);
  };
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHead title={title} extra={extra} ghost={false} span={12}>
        <Content
          extraContent={
            <>
              <TreeAnt onSelect={onSelect} selectedKey={keyfortree} />
            </>
          }
        >
          {isEdit ? (
            <AntFormDisplay formArray={summaryData} name={"menuEdit"} />
          ) : (
            renderContent()
          )}
        </Content>
      </PageHead>
    </div>
  );
};

export default PageHeadEdit;
