import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import _ from "lodash";
import $ from "jquery";
import axios from "axios";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";
import { useSelector, useDispatch } from "react-redux";
import { currentsetting } from "components/functions/config";
import { globalVariable } from "actions";
import { makeStyles } from "@material-ui/core/styles";

import "antd/dist/antd.css";
import { Button, Tooltip } from "antd";
import { DesktopOutlined, SaveOutlined } from "@ant-design/icons";
import PageHead from "components/Common/PageHeader";
import AntFormDisplay from "components/Common/AntFormDisplay";
import useForceUpdate from "use-force-update";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: 2,
  },
}));

const ElementInput = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();
  const [formArray, setFormArray] = useState([]);
  let elementData = useSelector((state) => state.global.elementData);

  useEffect(() => {
    console.log(elementData);
  }, []);
  const extra = [
    // <Tooltip title="Save" key="1save">
    //   <Button
    //     shape="circle"
    //     icon={<SaveOutlined />}
    //     onClick={() => {
    //       //remove onValuesChange
    //       delete formdt.data.setting.onValuesChange;
    //       axios
    //         .put(
    //           `${currentsetting.webserviceprefix}bootform/${formdt._id}`,
    //           formdt
    //         )
    //         .then((r) => console.log(r));
    //     }}
    //   />
    // </Tooltip>,
    <Tooltip title="View" key="2view">
      <Button
        shape="circle"
        icon={<DesktopOutlined />}
        onClick={() => history.push("/admin/form/formview")}
      />
    </Tooltip>,
  ];

  const summaryData = {
    setting: {
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
      },
      layout: "vertical",
      formColumn: 2,
      size: "small",
      // initialValues: {
      //   name: formdt.name,
      //   desc: formdt.desc,
      //   column: formdt.data.setting.formColumn,
      //   labelwidth: formdt.data.setting.formItemLayout.labelCol.span,
      //   layout: formdt.data.setting.layout,
      //   size: formdt.data.setting.size,
      // },
      // onValuesChange: (changedValues, allValues) => {
      //   formdt.name = allValues.name;
      //   formdt.desc = allValues.desc;
      //   let sett = formdt.data.setting;
      //   sett.formItemLayout.labelCol.span = allValues.labelwidth;
      //   sett.formItemLayout.wrapperCol.span = 24 - allValues.labelwidth;
      //   sett.formColumn = allValues.column;
      //   sett.layout = allValues.layout;
      //   sett.size = allValues.size;
      //   dispatch(globalVariable({ currentData: formdt }));
      //   if (["name", "desc"].indexOf(Object.keys(changedValues)[0]) === -1)
      //     forceUpdate();
      // },
      onFinish: (values) => {
        console.log("Received values of form: ", values);
      },
      onFinishFailed: (values, errorFields, outOfDate) => {
        console.log(values, errorFields, outOfDate);
      },
    },
    list: [
      { label: "Title", name: "name", type: "input", seq: 0 },
      {
        label: "Desc",
        name: "desc",
        type: "input.textarea",
        seq: 1,
      },
      {
        label: "Column",
        name: "column",
        type: "radio.group",
        defaultValue: 1,
        optionArray: [
          { text: "1", value: 1 },
          { text: "2", value: 2 },
          { text: "3", value: 3 },
        ],
        seq: 2,
      },
      {
        label: "Layout",
        name: "layout",
        type: "radio.button",
        defaultValue: "horizontal",
        optionArray: [
          { text: "horizontal", value: "horizontal" },
          { text: "vertical", value: "vertical" },
          { text: "inline", value: "inline" },
        ],
        seq: 3,
      },
      {
        label: "Label Width",
        name: "labelwidth",
        type: "slider",
        min: 0,
        max: 24,
        defaultValue: 6,
        marks: {
          0: 0,
          2: 2,
          4: 4,
          6: 6,
          8: 8,
          10: 10,
          12: 12,
          14: 14,
          16: 16,
          18: 18,
          20: 20,
          22: 22,
          24: 24,
        },
        seq: 4,
      },
      {
        label: "Size",
        name: "size",
        type: "radio.button",
        defaultValue: "middle",
        optionArray: [
          { text: "small", value: "small" },
          { text: "middle", value: "middle" },
          { text: "large", value: "large" },
        ],
        seq: 5,
      },
    ],
  };
  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHead title="FormEdit" onBack={true} extra={extra} ghost={false}>
          <AntFormDisplay formArray={summaryData} name={"fsummary"} />
        </PageHead>
      </div>
      {/* <AntFormDisplay formdt={formdt} /> */}
    </>
  );
};

export default ElementInput;
