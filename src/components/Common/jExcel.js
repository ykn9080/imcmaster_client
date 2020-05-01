import React, { useEffect, useState } from "react";
import $ from "jquery";
import ReactDOM from "react-dom";
import jexcel from "jexcel";

// import "./styles.css";
import "../../../node_modules/jexcel/dist/jexcel.css";

const JExcel = () => {
  const options = {
    data: [[]],
    minDimensions: [10, 10],
  };
  const [el, setEl] = useState("");
  useEffect(() => {
    //$(".spreadsheet").jexcel(options);
    const el1 = jexcel(document.getElementById("spreadsheet"), options);
    setEl(el1);
  }, []);

  const addRow = () => {
    el.insertRow();
  };
  console.log(el);
  return (
    <div>
      <div id="spreadsheet" />
      <br />
      <input type="button" value="Add new row" onClick={() => addRow()} />
    </div>
  );
};

export default JExcel;
