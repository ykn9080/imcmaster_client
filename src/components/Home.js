import React, { useEffect } from "react";
import Head from "./Head";
import { Example } from "./Head4";
import Recur, { Menu } from "./Head2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//  import { pageInit } from "../fromImc/core";

// const data = [
//   {
//     id: 1,
//     name: "Hello Kitty",
//     items: [
//       {
//         id: 2,
//         name: "Kitty Muu Muu"
//       },
//       {
//         id: 3,
//         name: "Kitty smack"
//       }
//     ]
//   },
//   {
//     id: 4,
//     name: "Hello Pussy",
//     items: [
//       {
//         id: 5,
//         name: "World",
//         items: [
//           {
//             id: 6,
//             name: "Hello Pussy world"
//           }
//         ]
//       }
//     ]
//   }
// ];
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
const Home = () => {
  useEffect(() => {
    //pageInit();
  }, []);
  return <Head />;
};

export default Home;
