import React, { useMemo, useState, useCallback, useEffect } from "react";
import tableDataItems from "./ReactDataTable_sampleDesserts";
import DataTable from "react-data-table-component";
import { Input } from "antd";

const ReactDataTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    console.log("state", selectedRows);
  }, [selectedRows]);

  const handleButtonClick = (row) => {
    console.log("clicked", row);
  };

  const handleChange = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const columns = useMemo(
    () => [
      {
        cell: (row) => (
          <button
            onClick={() => {
              console.log(row);
              handleButtonClick(row);
            }}
          >
            Action
          </button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
      {
        name: "Name",
        selector: "name",
        sortable: true,
        grow: 2,
      },
      {
        name: "Type",
        selector: "type",
        sortable: true,
      },
      {
        name: "Calories (g)",
        selector: "calories",
        sortable: true,
        right: true,
      },
      {
        name: "Fat (g)",
        selector: "fat",
        sortable: true,
        right: true,
      },
      {
        name: "Carbs (g)",
        selector: "carbs",
        sortable: true,
        right: true,
      },
      {
        name: "Protein (g)",
        selector: "protein",
        sortable: true,
        right: true,
      },
      {
        name: "Sodium (mg)",
        selector: "sodium",
        sortable: true,
        right: true,
      },
      {
        name: "Calcium (%)",
        selector: "calcium",
        sortable: true,
        right: true,
      },
      {
        name: "Iron (%)",
        selector: "iron",
        sortable: true,
        right: true,
      },
    ],
    []
  );
  const ExpanableComponent = ({ data }) => {
    return Object.keys(data).map((k, i) => {
      return <p>{k}</p>;
    });
  };

  //<p>{JSON.stringify(data)}</p>;
  return (
    <DataTable
      title="Desserts"
      data={tableDataItems}
      columns={columns}
      onSelectedRowsChange={handleChange}
      selectableRows
      expandableRows
      expandableRowsComponent={<ExpanableComponent />}
    />
  );
};

export default ReactDataTable;
