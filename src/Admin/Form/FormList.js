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
          href: "/admin/formview",
          avatar: {
            size: 32,
            style: { backgroundColor: "#87d068" },
            icon: <UserOutlined />,
          },
          description: k.desc,
        });
      });
      setListData(imsiData1);
      setLoading(false);
    });

    // setTimeout(() => {
    //   imsiData = [];
    //   for (let i = 0; i < 23; i++) {
    //     imsiData.push({
    //       href: "http://ant.design",
    //       title: `ant design part ${i}`,
    //       avatar: {
    //         size: 32,
    //         style: { backgroundColor: "#87d068" },
    //         icon: <UserOutlined />,
    //       },
    //       // "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    //       description:
    //         "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    //       content:
    //         "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    //     });
    //   }
    //   setListData(imsiData);
    //  setLoading(false);
    //}, 2000);
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
      size={"large"}
      layout={"vertical"}
      footer={footer}
      pagination={pagination}
    />
  );
};

export default FormList;
