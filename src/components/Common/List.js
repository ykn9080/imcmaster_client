import React, { useState, useEffect } from "react";
import { List, Avatar, Button, Skeleton } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";

const AntList = () => {
  const listData = [];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  for (let i = 0; i < 23; i++) {
    listData.push({
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
  const IconText = ({ icon, text }) => (
    <span>
      {React.createElement(icon, { style: { marginRight: 8 } })}
      {text}
    </span>
  );
  return (
    <Skeleton loading={loading} active avatar>
      <List
        className="demo-loadmore-list"
        //   loading={initLoading}
        itemLayout="vertical"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        //   footer={
        //     <div>
        //       <b>ant design</b> footer part
        //     </div>
        //   }
        size="small"
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                onClick={() => console.log("hi")}
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
            //   extra={
            //     <img
            //       width={272}
            //       alt="logo"
            //       src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            //     />
            //   }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </Skeleton>
  );
};

export default AntList;
