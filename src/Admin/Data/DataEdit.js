import React, { useState } from "react";
import axios from "axios";
import AntFormDisplay from "components/Common/AntFormDisplay";
import DataGrid from "components/Common/DataGrid";
import ReactDataGrid from "react-data-grid";
import useForceUpdate from "use-force-update";

const DataEdit = () => {
  const forceUpdate = useForceUpdate();
  const [fetched, setFetched] = useState([]);
  const formdt = {
    setting: {
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
      },
      layout: "horizontal",
      formColumn: 1,
      size: "large",
      // initialValues: { name: "hhh" },
      onFinish: (values) => {
        console.log("Received values of form: ", values);
        axios.get(values.url).then((response) => {
          console.log(response.data);
          setFetched(response.data);
          forceUpdate();
        });
      },
      onFinishFailed2: (values, errorFields, outOfDate) => {
        console.log(values, errorFields, outOfDate);
      },
    },
    list: [
      //inline form
      {
        label: "Url",
        name: "url",
        type: "nostyle",
        seq: 0,
        array: [
          {
            name: "url",
            placeholder: "Input url",
            type: "input",
            seq: 0,
          },
          {
            type: "button",
            seq: 1,
            btnLabel: "Fetch",
            btnStyle: "primary",
            htmlType: "submit",
          },
        ],
      },
      // {
      //   type: "button",
      //   seq: 1000,
      //   tailLayout: {
      //     wrapperCol: { offset: 8, span: 16 },
      //   },
      //   // //signle button
      //   // btnLabel: "Submit",
      //   // btnStyle: "secondary",
      //   // htmlType: "submit",

      //   //in case multiple button
      //   btnArr: [
      //     {
      //       btnLabel: "Submit",
      //       btnStyle: "secondary",
      //       htmlType: "submit",
      //       seq: 0,
      //     },
      //     {
      //       btnLabel: "Cancel",
      //       btnStyle: "primary",
      //       htmlType: "button",
      //       seq: 1,
      //     },
      //   ],
      // },
    ],
  };
  const DataGrid1 = ({ data }) => {
    let columns = [];
    if (data.length > 0)
      Object.keys(data[0]).map((k, i) => {
        columns.push({ key: k, name: k.charAt(0).toUpperCase() + k.slice(1) });
      });
    console.log(data, columns);
    return (
      <ReactDataGrid
        columns={columns}
        rowGetter={(i) => data[i]}
        rowsCount={4}
        minHeight={200}
      />
    );
  };
  return (
    <>
      <AntFormDisplay formArray={formdt} />
      <DataGrid1 data={fetched} />
    </>
  );
};

export default DataEdit;
