import React, { useEffect, useMemo, useState } from "react";
import Sortable from "./MenuSortable";
import Droppable from "./MenuDroppable";

export const HeadEdit = () => {
  const list = ["ReactJS", "JSX", "JavaScript", "jQuery", "jQuery UI"];
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleEnableability = () => {
    setIsEnabled(!isEnabled);
  };
  const myData = [
    {
      access: [],
      _id: "5e3a92713858701652b09292",
      id: "s1",
      pid: "m1",
      comp: "1",
      title: "Sub1",
      desc: "sub1페이지1111",
      creator: "ykn",
      seq: 0,
      private: false,
      layout: [
        {
          _id: "5e3a94873858705598b09294",
          rowseq: 0,
          colseq: 0,
          ctrid: ""
        }
      ],
      __v: 0
    },
    {
      access: [],
      _id: "5e3bc558069da0e31aa6d891",
      id: "s3",
      comp: "1",
      creator: "ykn",
      desc: "sub3페이지",
      pid: "m2",
      private: false,
      seq: 0,
      title: "Sub3",
      layout: []
    },
    {
      access: [],
      _id: "5e3bcb7f069da0e31aa6eb91",
      id: "m1",
      comp: "1",
      creator: "ykn",
      desc: "첫페이지소개",
      layout: [
        {
          rowseq: 0,
          colseq: 0,
          ctrid: ""
        }
      ],
      pid: "",
      private: false,
      seq: 0,
      title: "FristMenu"
    },
    {
      access: [],
      _id: "5e3bcb7f069da0e31aa6eb92",
      id: "m2",
      comp: "1",
      creator: "ykn",
      desc: "second페이지소개",
      pid: "",
      private: false,
      seq: 1,
      title: "SecondMenu",
      layout: []
    },
    {
      access: [],
      _id: "5e3bcb7f069da0e31aa6eb93",
      id: "s2",
      comp: "1",
      creator: "ykn",
      desc: "sub2페이지",
      pid: "m1",
      private: false,
      seq: 0,
      title: "Sub2",
      layout: []
    },
    {
      access: [],
      _id: "5e3bcb7f069da0e31aa6eb94",
      id: "s2-1",
      comp: "1",
      creator: "ykn",
      desc: "sub2-1페이지",
      pid: "s2",
      private: false,
      seq: 0,
      title: "Sub2-1",
      layout: []
    }
  ];
  const menulist = myData.filter(
    (item, itemIndex) => item.comp === "1" && item.pid === ""
  );
  return (
    <>
      <button type="button" onClick={toggleEnableability}>
        Toggle enable/disable
      </button>
      <Sortable
        opacity={0.8}
        data={list}
        enable={isEnabled}
        onChange={(event, ui) => console.log("DOM changed!", event, ui)}
      />
      <Droppable
        opacity={0.8}
        data={menulist}
        enable={isEnabled}
        onDrop={(event, ui) => console.log("DOM changed!", event, ui)}
      />
    </>
  );
};
