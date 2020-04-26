import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { currentsetting } from "components/functions/config";
import AntList from "components/Common/List";
import { Avatar, Tooltip, Button } from "antd";
import PageHead from "components/Common/PageHeader";
import { FileAddOutlined, FormOutlined } from "@ant-design/icons";
import useForceUpdate from "use-force-update";

const FormList = () => {
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const forceUpdate = useForceUpdate();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios.get(currentsetting.webserviceprefix + "bootform").then((response) => {
      let imsiData1 = [];
      response.data.map((k, i) => {
        imsiData1.push({
          _id: k._id,
          data: k.data,
          name: k.name,
          description: k.desc,
          titleHandler: true,
          href: {
            pathname: "/admin/form/formview",
            search: `?_id=${k._id}`,
            state: k,
          },
          avatar: {
            size: 32,
            style: { backgroundColor: "#87d068" },
            shape: "square",
            icon: <FormOutlined />,
          },
          desc: k.desc,
        });
      });
      setListData(imsiData1);
      //리로드 귀찮아서 해둰거 개발완료시 지울것!!!!!!!!!!!!!!!!!
      localStorage.setItem("imsi", JSON.stringify(imsiData1[0]));

      setLoading(false);
    });
  }, []);

  const createHandler = () => {
    dispatch(globalVariable({ currentData: "" }));
    dispatch(globalVariable({ selectedKey: "" }));
    history.push("/admin/form/formedit");
  };

  const editHandler = (item) => {
    dispatch(globalVariable({ currentData: item }));
    dispatch(globalVariable({ selectedKey: item._id }));
    history.push("/admin/form/formedit");
  };

  const deleteHandler = (item) => {
    let config = {
      method: "delete",
      url: `${currentsetting.webserviceprefix}bootform/${item._id}`,
    };
    axios(config).then((r) => {
      console.log(r);
      console.log(listData);
      _.remove(listData, function (currentObject) {
        return currentObject._id === item._id;
      });
      console.log(listData);
      setListData(listData);
      localStorage.removeItem("imsi");
      dispatch(globalVariable({ currentData: "" }));
      forceUpdate();
    });
  };
  const footer = (
    <div>
      <b>ant design</b> footer part
    </div>
  );
  const pagination = {
    onChange: (page) => {
      console.log(page);
    },
    pageSize: 5,
  };
  const extra = [
    <Tooltip title="Create New" key="1create">
      <Button
        shape="circle"
        icon={<FileAddOutlined />}
        onClick={createHandler}
      />
    </Tooltip>,
  ];
  return (
    <>
      <PageHead title="Form" extra={extra}></PageHead>
      <AntList
        listData={listData}
        loading={loading}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        size={"small"}
        layout={"vertical"}
        footer={footer}
        pagination={pagination}
      />
    </>
  );
};

export default FormList;
