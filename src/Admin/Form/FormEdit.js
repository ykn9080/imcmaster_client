import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { useLocation, useHistory, Link } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { DesktopOutlined, EditFilled } from "@ant-design/icons";
import PageHead from "components/Common/PageHeader";
import AntFormBuild from "components/Common/AntFormBuild";
import AntFormDisplay from "components/Common/AntFormDisplay";
import "components/Common/Antd.css";

const InitValueAssign = (props) => {};
const FormEdit = (props) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  dispatch(globalVariable({ formEdit: true }));
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
  const summaryData = {
    setting: {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      layout: "horizontal",
      col: 2,
      size: "small",
      initialValues: {
        title: "hhh",
        desc: "good boy",
        column: 2,
        layout: "horizontal",
        size: "small",
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
        type: "input",
        seq: 1,
      },
      {
        label: "Column",
        name: "column",
        type: "inputNumber",
        seq: 2,
      },
      {
        label: "Layout",
        name: "layout",
        type: "radio.button",
        optionArray: [
          { text: "horizontal", value: "horizontal" },
          { text: "vertical", value: "vertical" },
          { text: "inline", value: "inline" },
        ],
        seq: 3,
      },
      {
        label: "Label:Input",
        name: "label:input",
        type: "slider",
        min: 0,
        max: 24,
        marks: {
          0: "0",
          2: "2",
          4: "4",
          6: "6",
          8: "8",
          10: "10",
          12: "12",
          14: "14",
          16: "16",
          18: "18",
          20: "20",
          22: "22",
          24: "24",
        },
        seq: 4,
      },
      {
        label: "Size",
        name: "size",
        type: "radio.button",
        optionArray: [
          { text: "small", value: "small" },
          { text: "middle", value: "middle" },
          { text: "large", value: "large" },
        ],
        seq: 5,
      },

      {
        type: "button",
        seq: 1000,
        tailLayout: {
          wrapperCol: { offset: 8, span: 16 },
        },
        btnArr: [
          {
            btnLabel: "Submit",
            btnStyle: "secondary",
            htmlType: "submit",
            seq: 0,
          },
          {
            btnLabel: "Cancel",
            btnStyle: "primary",
            htmlType: "button",
            seq: 1,
          },
        ],
      },

      // {
      //   label: "Date",
      //   name: "date",
      //   type: "datepicker",
      //   rules: [
      //     { type: "object", required: true, message: "Please select time!" },
      //   ],
      //   seq: 0,
      // },
    ],
  };
  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHead title="FormEdit" onBack={true} extra={extra} ghost={false}>
          <AntFormDisplay formArray={summaryData} editable={false} />
        </PageHead>
      </div>
      <AntFormBuild formArray={location.state.data} />
    </>
  );
};

export default FormEdit;
