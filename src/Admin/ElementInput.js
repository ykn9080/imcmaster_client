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
  let elementData = useSelector((state) => state.global.elementData);
  let currentData = useSelector((state) => state.global.currentData);
  const [elArray, setElArray] = useState("");
  const [formArray, setFormArray] = useState([]);
  console.log(formArray);
  useEffect(() => {
    currentData.data.list = [elementData];
    currentData.data.setting = {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },
      layout: "vertical",
      formColumn: 1,
      size: "large",
    };
    setFormArray(currentData.data);
    let rule = [];
    if (elementData.rules.length > 0) rule = elementData.rules[0];
    const summaryData = {
      setting: {
        formItemLayout: {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        },
        layout: "horizontal",
        formColumn: 2,
        size: "middle",
        initialValues: {
          type: elementData.type,
          name: elementData.name,
          label: elementData.label,
          placeholder: elementData.placeholder,
          defaultvalue: elementData.defaultValue,
          required: rule.required,
          errormsg: rule.message,
          tooltipicon: elementData.tooltipicon,
          tooltipmsg: elementData.tooltipmsg,
        },
        onValuesChange: (changedValues, allValues) => {
          const newval = { ...elArray.list[0], ...changedValues };
          elArray.list = [newval];
          setElArray(elArray);
          console.log(elArray, newval);
          currentData.data.list = [newval];
          setFormArray(currentData.data);
          console.log(formArray, currentData.data, newval);
          // formdt.name = allValues.name;
          // formdt.desc = allValues.desc;
          // let sett = formdt.data.setting;
          // sett.formItemLayout.labelCol.span = allValues.labelwidth;
          // sett.formItemLayout.wrapperCol.span = 24 - allValues.labelwidth;
          // sett.formColumn = allValues.column;
          // sett.layout = allValues.layout;
          // sett.size = allValues.size;
          // dispatch(globalVariable({ currentData: formdt }));
          // if (["name", "desc"].indexOf(Object.keys(changedValues)[0]) === -1)
          //   forceUpdate();
        },
        onFinish: (values) => {
          console.log("Received values of form: ", values);
        },
        onFinishFailed: (values, errorFields, outOfDate) => {
          console.log(values, errorFields, outOfDate);
        },
      },
      list: [
        { label: "Type", name: "type", type: "input", seq: 0 },
        { label: "Name", name: "name", type: "input", seq: 1 },
        { label: "Label", name: "label", type: "input", seq: 2 },
        { label: "Placeholder", name: "placeholder", type: "input", seq: 3 },
        { label: "DefaultValue", name: "defaulvalue", type: "input", seq: 4 },
        {
          label: "Required",
          type: "nostyle",
          array: [
            {
              name: "required",
              type: "checkbox",
              width: "10%",
              seq: 0,
            },
            {
              name: "message",
              type: "input",
              seq: 1,
              width: "90%",
              defaultValue: "is required",
              placeholder: "write error message!",
            },
          ],
          seq: 5,
        },
        {
          label: "Tooltip",
          type: "nostyle",
          array: [
            {
              name: "icon",
              type: "select",
              optionArray: [
                { text: "horizontal", value: "horizontal" },
                { text: "vertical", value: "vertical" },
                { text: "inline", value: "inline" },
              ],
              seq: 0,
            },
            {
              name: "message",
              type: "input",
              placeholder: "write message",
              seq: 1,
            },
          ],
          seq: 6,
        },
      ],
    };
    setElArray(summaryData);
  }, []);
  const extra = [
    <Tooltip title="Save" key="1save">
      <Button
        shape="circle"
        icon={<SaveOutlined />}
        onClick={() => {
          //remove onValuesChange
          // delete formdt.data.setting.onValuesChange;
          // axios
          //   .put(
          //     `${currentsetting.webserviceprefix}bootform/${formdt._id}`,
          //     formdt
          //   )
          //   .then((r) => console.log(r));
        }}
      />
    </Tooltip>,
    // <Tooltip title="View" key="2view">
    //   <Button
    //     shape="circle"
    //     icon={<DesktopOutlined />}
    //     onClick={() => history.push("/admin/form/formview")}
    //   />
    // </Tooltip>,
  ];

  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHead title="Element Edit" extra={extra} ghost={false}>
          <AntFormDisplay formArray={elArray} name={"esummary"} />
        </PageHead>
      </div>
      <AntFormDisplay formArray={formArray} />
    </>
  );
};

export default ElementInput;
