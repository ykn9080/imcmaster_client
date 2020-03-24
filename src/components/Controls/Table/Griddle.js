import React, { useState, useEffect } from "react";
import Griddle from "griddle-react";
import ReactDataGrid from "react-data-grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";

export const GriddleTable = () => {
  var data = [
    { one: "one", two: "two", three: "three" },
    { one: "uno", two: "dos", three: "tres" },
    { one: "ichi", two: "ni", three: "san" }
  ];
  return <Griddle data={data} />;
};

const columns = [
  { key: "id", name: "ID" },
  { key: "title", name: "Title" },
  { key: "count", name: "Count" }
];

const rows = [
  { id: 0, title: "row1", count: 20 },
  { id: 1, title: "row1", count: 40 },
  { id: 2, title: "row1", count: 60 }
];

export function RDG() {
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => rows[i]}
      rowsCount={3}
      minHeight={150}
    />
  );
}

export const BootTable = props => {
  let condensed = "";
  if (props.condensed) condensed = props.condensed;
  const [state, setState] = useState({
    products: [],
    columns: [
      {
        dataField: "id",
        text: "Product ID",
        sort: true
      },
      {
        dataField: "name",
        text: "Product Name",
        sort: true,
        filter: textFilter()
      },
      {
        dataField: "price",
        text: "Product Price",
        sort: true
      },
      {
        dataField: "quality",
        text: "Product Quality",
        sort: true,
        editor: {
          type: Type.SELECT,
          options: [
            {
              value: "A",
              label: "A"
            },
            {
              value: "B",
              label: "B"
            },
            {
              value: "C",
              label: "C"
            },
            {
              value: "D",
              label: "D"
            },
            {
              value: "E",
              label: "E"
            }
          ]
        }
      },
      {
        dataField: "done",
        text: "Done",
        editor: {
          type: Type.CHECKBOX,
          value: "Y:N"
        }
      },
      {
        dataField: "date",
        text: "Date",
        formatter: cell => {
          let dateObj = cell;
          if (typeof cell !== "object") {
            dateObj = new Date(cell);
          }
          return `${("0" + dateObj.getUTCDate()).slice(-2)}/${(
            "0" +
            (dateObj.getUTCMonth() + 1)
          ).slice(-2)}/${dateObj.getUTCFullYear()}`;
        },
        editor: {
          type: Type.DATE
        }
      },
      {
        dataField: "desc",
        text: "desc",
        editor: {
          type: Type.TEXTAREA
        }
      }
    ]
  });
  useEffect(() => {
    axios.get("http://localhost:3001/results").then(response => {
      console.log(response);
      setState({ ...state, products: response.data.results });
    });
  }, []);
  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    clickToEdit: true
  };
  return (
    <div className="container" style={{ marginTop: 50 }}>
      <BootstrapTable
        striped
        hover
        keyField="id"
        data={state.products}
        columns={state.columns}
        filter={filterFactory()}
        pagination={paginationFactory()}
        cellEdit={cellEditFactory({
          mode: "dbclick",
          blurToSave: true,
          onStartEdit: (row, column, rowIndex, columnIndex) => {
            console.log("start:", row, column, rowIndex, columnIndex);
          },
          beforeSaveCell: (oldValue, newValue, row, column) => {
            console.log("Before:", oldValue, newValue, row, column);
          },
          afterSaveCell: (oldValue, newValue, row, column) => {
            console.log("After:", oldValue, newValue, row, column);
          }
        })}
        selectRow={selectRow}
      />
      <Button
        onClick={() => {
          axios.get("http://localhost:3001/results").then(response => {
            console.log(response);
            //setState({ ...state, products: response.data });
          });
        }}
      >
        click
      </Button>
    </div>
  );
};
