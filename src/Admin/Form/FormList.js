import React, { useState, useEffect } from "react";
import axios from "axios";
import { currentsetting } from "components/functions/config";
import AntList from "components/Common/List";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

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
          title: k.name,
          href: "/admin/form/formview",
          avatar: {
            size: 32,
            style: { backgroundColor: "#87d068" },
            icon: <UserOutlined />,
          },
          description: k.desc,
          //content: k.desc,
          extra: {
            width: 200,
            alt: "k.alt",
            src:
              "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
          },
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
