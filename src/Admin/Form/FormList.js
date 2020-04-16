import React, { useState, useEffect } from "react";
import axios from "axios";
import { currentsetting } from "components/functions/config";
import AntList from "components/Common/List";
import { Avatar } from "antd";
import { UserOutlined, FormOutlined } from "@ant-design/icons";

const FormList = () => {
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const axiosData = async (method, url, data) => {
    let rtn;
    const response = await axios({
      method: method,
      url: currentsetting.webserviceprefix + url,
      data: data,
    }).then((result) => (rtn = result.data));
    console.log(rtn);
    return rtn;
  };
  useEffect(() => {
    setLoading(true);
    axios.get(currentsetting.webserviceprefix + "bootform").then((response) => {
      let imsiData1 = [];
      response.data.map((k, i) => {
        imsiData1.push({
          _id: k._id,
          data: k.data,
          title: k.name,
          href: "/admin/form/formview",
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
          description: k.desc,
        });
      });
      setListData(imsiData1);
      setLoading(false);
    });
  }, []);

  const editHandler = (item) => {
    console.log(item);
  };
  const deleteHandler = (item) => {
    console.log(item);
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

  return (
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
  );
};

export default FormList;
