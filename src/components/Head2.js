import React, { useEffect, useMemo } from "react";

export const Menu = ({ data }) => {
  return (
    <ul>
      {data.map(m => {
        return (
          <li>
            {m.title}
            {m.children && <Menu data={m.children} />}
          </li>
        );
      })}
    </ul>
  );
};

const Recur = () => {
  return <Menu data={data} />;
};

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

let data = [
  {
    title: "Top level 1",
    slug: "top-level-1",
    children: [
      {
        title: "Sub level 1",
        slug: "sub-level-1",
        children: [
          {
            title: "Sub Sub Level 1",
            slug: "sub-sub-level-1",
            children: [
              {
                title: "Sub Sub Level 2",
                slug: "sub-sub-level-2",
                children: [
                  {
                    title: "Sub Sub Level 23",
                    slug: "sub-sub-level-23"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        title: "Sub level 2",
        slug: "sub-level-2"
      }
    ]
  },
  {
    title: "Top level 2",
    slug: "top-level 2"
  }
];
export default Recur;
