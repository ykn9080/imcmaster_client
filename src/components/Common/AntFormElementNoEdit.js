import React from "react";
import "antd/dist/antd.css";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
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
  Cascader,
} from "antd";

const { Option } = Select;

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: 2,
  },
}));

const AntFormElementNoEdit = (props) => {
  const classes = useStyles();
  const formItemProps = {
    label: props.label,
    name: props.name,
    ...(props.rules !== "undefined" && { rules: props.rules }),
  };
  const tailLayout = {
    ...(props.type === "button" &&
      props.tailLayout != null && { ...props.tailLayout }),
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
                      htmlType: k.htmlType,
                    };
                    return <Button {...btnProps}>{btnLabel}</Button>;
                  })}
                </div>
              );

              break;
          }
        })()}
      </Form.Item>
    </>
  );
};
export default AntFormElementNoEdit;
