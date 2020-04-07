import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import _ from "lodash";
import "antd/dist/antd.css";
import { useConfirm } from "material-ui-confirm";
import { makeStyles } from "@material-ui/core/styles";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  Radio,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Cascader
} from "antd";

const { Option } = Select;
// const layout = {
//   labelCol: {
//     span: 8
//   },
//   wrapperCol: {
//     span: 16
//   }
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 16
//   }
// };
const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: 2
  }
}));

const AntFormElement = props => {
  const classes = useStyles();
  const confirm = useConfirm();
  const formItemProps = {
    label: props.label,
    name: props.name,
    ...(props.rules !== "undefined" && { rules: props.rules })
  };
  const tailLayout = {
    ...(props.type === "button" &&
      props.tailLayout != null && { ...props.tailLayout })
  };
  let edit = useSelector(state => state.global.formEdit);

  const dispatch = useDispatch();

  let open = useSelector(state => state.global.openDialog);

  const EditDel = props => {
    const deleteHandler = id => {
      confirm({ description: "This action is permanent!" }).then(() => {
        console.log(id);
      });
    };
    const editHandler = id => {
      dispatch(globalVariable({ openDialog: true }));
      dispatch(globalVariable({ elementData: props }));
      open = true;
      console.log(id);
    };

    return (
      edit && (
        <>
          <EditOutlined
            className={classes.icon}
            onClick={() => editHandler(props.controlId)}
          />
          <DeleteOutlined
            className={classes.icon}
            onClick={() => deleteHandler(props.controlId)}
          />
        </>
      )
    );
  };
  return (
    <>
      <Form.Item {...formItemProps} {...tailLayout}>
        {(() => {
          switch (props.type) {
            case "input":
              return <Input />;
              break;
            case "input.password":
              return <Input.Password />;
              break;
            case "datepicker":
              return <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />;
              break;
            case "button":
              return (
                <div>
                  {_.orderBy(props.btnArr, ["seq"]).map((k, i) => {
                    let btnStyle = "primary",
                      btnLabel = "Submit";
                    if (k.btnStyle !== "undefined") btnStyle = k.btnStyle;
                    if (k.btnLabel !== "undefined") btnLabel = k.btnLabel;

                    let btnProps = {
                      type: btnStyle,
                      htmlType: k.htmlType
                    };
                    return <Button {...btnProps}>{btnLabel}</Button>;
                  })}
                </div>
              );

              break;
          }
        })()}
        <EditDel {...props} />
      </Form.Item>
    </>
  );
};
export default AntFormElement;
