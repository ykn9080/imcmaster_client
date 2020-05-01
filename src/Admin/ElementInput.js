import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import _ from "lodash";
import cloneDeep from "lodash/cloneDeep";
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
import {
  DesktopOutlined,
  SaveOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
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

  const curr = useMemo(() => {
    let curr = cloneDeep(currentData);
    curr.data.list = [elementData];
    curr.data.setting = {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },
      layout: "horizontal",
      formColumn: 1,
      size: "middle",
    };

    return curr.data;
  }, []);

  const summaryData = useMemo(() => {
    let rule = [];
    if (elementData.rules && elementData.rules.length > 0)
      rule = elementData.rules[0];
    const summaryData = {
      setting: {
        formItemLayout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },
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
          requiredmsg: rule.message,
          tooltipicon: elementData.tooltipicon,
          tooltipmsg: elementData.tooltipmsg,
        },
        onValuesChange: (changedValues, allValues) => {
          let requireobj = {},
            instantlist,
            instant = instantView.list[0];

          const obj = Object.keys(changedValues)[0];
          if (obj === "required") {
            requireobj = { required: changedValues[obj] };
            if (
              allValues["requiredmsg"] != "undefined" &&
              allValues["requiredmsg"] != ""
            )
              requireobj = {
                ...requireobj,
                message: allValues["requiredmsg"],
              };

            instantlist = { ...instant, rules: [requireobj] };
            instantView.list = [instantlist];
          } else {
            instantlist = { ...instant, ...changedValues };
            instantView.list = [instantlist];
          }
          console.log(instantView);
          setInstantView(instantView);
          const setupinitialValues = {
            ...setupData.setting.initialValues,
            ...changedValues,
          };
          setupData.setting.initialValues = setupinitialValues;
          setSetupData(setupData);
          console.log(setupData, instantView);
        },
        onFinish: (values) => {
          console.log("Received values of form: ", values);
        },
        onFinishFailed: (values, errorFields, outOfDate) => {
          console.log(values, errorFields, outOfDate);
        },
      },
      list: [
        {
          label: "Type",
          name: "type",
          type: "select",
          optionArray: [
            { text: "ss", value: "ss" },
            { text: "ss2", value: "ss1" },
          ],
          seq: 0,
        },
        { label: "Name", name: "name", type: "input", seq: 1 },
        { label: "Label", name: "label", type: "input", seq: 2 },
        { label: "Placeholder", name: "placeholder", type: "input", seq: 3 },
        { label: "DefaultValue", name: "defaulvalue", type: "input", seq: 4 },
        {
          label: "Tooltip",
          type: "input",
          name: "tooltipmsg",
          placeholder: "write tooltip message",
          seq: 5,
        },
        {
          label: "Required",
          type: "nostyle",
          array: [
            {
              name: "required",
              type: "checkbox",
              valuePropName: "checked",
              width: "10%",
              seq: 0,
            },
            {
              name: "requiredmsg",
              type: "input",
              seq: 1,
              width: "90%",
              defaultValue: "is required",
              placeholder: "write error message!",
            },
          ],
          seq: 6,
        },
      ],
    };
    return summaryData;
  }, []);

  const [setupData, setSetupData] = useState({ ...summaryData });
  const [instantView, setInstantView] = useState({ ...curr });
  console.log(setupData, instantView);
  useEffect(() => {}, []);
  const extra = [
    <Tooltip title="Save" key="1save">
      <Button
        shape="circle"
        icon={<SaveOutlined />}
        onClick={() => {
          console.log(
            "cd:",
            currentData,
            "setup:",
            setupData,
            "instant:",
            instantView
          );
          dispatch(globalVariable({ elementData: instantView.list[0] }));
          let isExist = false;
          currentData.data.list.map((k, i) => {
            if (k.seq === instantView.list[0].seq) {
              currentData.data.list.splice(i, 1, instantView.list[0]);
              isExist = true;
            }
          });
          if (!isExist) currentData.data.list.push(instantView.list[0]);
          dispatch(globalVariable({ currentData: currentData }));
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
          <AntFormDisplay formArray={setupData} name={"esetup"} />
        </PageHead>
      </div>
      <AntFormDisplay formArray={instantView} name={"instantview"} />
    </>
  );
};

export default ElementInput;
