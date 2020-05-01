import React from "react";
import AntFormDisplay from "components/Common/AntFormDisplay";

const DataEdit = () => {
  const formdt = {
    setting: {
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
      },
      layout: "inline",
      formColumn: 1,
      size: "middle",
      //   initialValues: {
      //     ...{ initialValue },
      //   },
      // onFieldsChange: (changedFields, allFields) => {
      //   const cf1 = changedFields[0];
      //   if (["title", "desc"].indexOf(cf1.name[0]) === -1) {
      //     formdt[cf1.name[0]] = cf1.value;
      //     dispatch(globalVariable({ currentData: formdt }));
      //     console.log("field", changedFields, allFields);
      //   }
      // },
      //   onValuesChange: (changedValues, allValues) => {
      //     formdt.name = allValues.name;
      //     formdt.desc = allValues.desc;
      //     let sett = formdt.data.setting;
      //     sett.formItemLayout.labelCol.span = allValues.labelwidth;
      //     sett.formItemLayout.wrapperCol.span = 24 - allValues.labelwidth;
      //     sett.formColumn = allValues.column;
      //     sett.layout = allValues.layout;
      //     sett.size = allValues.size;
      //     dispatch(globalVariable({ currentData: formdt }));
      //     if (["name", "desc"].indexOf(Object.keys(changedValues)[0]) === -1)
      //       forceUpdate();
      //   },
      onFinish: (values) => {
        console.log("Received values of form: ", values);
      },
      onFinishFailed: (values, errorFields, outOfDate) => {
        console.log(values, errorFields, outOfDate);
      },
    },
    list: [
      { label: "URL", name: "url", type: "input", seq: 0 },
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
              console.log("cancel");
            },
            seq: 1,
          },
        ],
      },
    ],
  };
  return <AntFormDisplay formArray={formdt} />;
};

export default DataEdit;
