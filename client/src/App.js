import React, { useEffect, useState } from "react";
import "./App.css";

import { useTable, useSortBy, usePagination, useFilters } from "react-table";
import Modal from "react-modal";

Modal.setAppElement("body");

const modalStyle = {
  content: {
    bottom: "auto",
    minHeight: "10rem",
    left: "50%",
    padding: "2rem",
    position: "fixed",
    right: "auto",
    top: "50%",
    transform: "translate(-50%,-50%)",
    minWidth: "20rem",
    width: "80%",
    maxWidth: "60rem"
  }
};

function App() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [extraData, setExtraData] = useState([]);
  const [modalContent, setModalContent] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    fetch("/getrows")
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        setColumns(jsonResponse.columns);
        setData(jsonResponse.data);
        setExtraData(jsonResponse.extraData);
      });
  }, []);

  function clicker(extra) {
    var elements = [];

    for (var i = 0; i < extra.length; i++) {
      var el = extra[i];
      if (el.type === "p") {
        elements.push(<p key={el.name}>{el.data}</p>);
      } else if (el.type === "h1") {
        elements.push(<h1 key={el.name}>{el.data}</h1>);
      } else if (el.type === "h2") {
        elements.push(<h2 key={el.name}>{el.data}</h2>);
      } else if (el.type === "img") {
        if (el.data.includes("*")) {
          var arr = el.data.split("*");
          elements.push(<img key={el.name} src={arr[0]} width={arr[1]} />);
        } else {
          elements.push(<img key={el.name} src={el.data} width="200" />);
        }
      }
    }

    setModalContent(<div>{elements}</div>);
    openModal();
  }

  return (
    <div className="App">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={modalStyle}
      >
        <button className="close" onClick={closeModal}>
          X
        </button>
        {modalContent}
      </Modal>
      <Table
        columns={columns}
        data={data}
        extraData={extraData}
        setData={setData}
        clicker={clicker}
      />
    </div>
  );
}

function Table({ columns, data, extraData, modal, clicker }) {
  const [filterInput, setFilterInput] = useState("");

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("title", value);
    setFilterInput(value);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setFilter,

    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex }
  } = useTable(
    {
      columns,
      data,
      initialState: { sortBy: [{ id: "title", desc: false }] }
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div className="movies">
      <input
        className="search"
        value={filterInput || ""}
        onChange={handleFilterChange}
        placeholder={"Search title"}
      />
      <table className="main-table" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  className={
                    column.isSorted ? (column.isSortedDesc ? "up" : "down") : ""
                  }
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <span className="uparrow">˄</span>
                    ) : (
                      <span className="downarrow">˅</span>
                    )
                  ) : (
                    ""
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr
                onClick={() => clicker(extraData[row.id])}
                {...row.getRowProps()}
              >
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            className="goto"
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
        </span>{" "}
      </div>
    </div>
  );
}

export default App;
