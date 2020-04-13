import React, { useState, useEffect } from "react";
import AntList from "components/Common/List";

const FormList = () => {
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let imsiData = [];
      for (let i = 0; i < 23; i++) {
        imsiData.push({
          href: "http://ant.design",
          title: `ant design part ${i}`,
          avatar:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          description:
            "Ant Design, a design language for background applications, is refined by Ant UED Team.",
          content:
            "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
        });
      }
      setListData(imsiData);
      setLoading(false);
    }, 2000);
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
