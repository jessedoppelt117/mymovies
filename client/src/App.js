import React from 'react';
import './App.css';

import {
  useTable,
  useSortBy,
  usePagination
} from 'react-table'

function App() {
  const data = React.useMemo(
    () => [
      {name: "Batman", actor: "Christian Bale"},
      {name: "Mystic River", actor: "Sean Penn"},
      {name: "Batman", actor: "Christian Bale"},
      {name: "Batman", actor: "Christian Bale"},
      {name: "Batman", actor: "Christian Bale"},
      {name: "Batman", actor: "Christian Bale"},
      {name: "Batman", actor: "Christian Bale"},
      {name: "Batman", actor: "Christian Bale"},
      {name: "Batman", actor: "Christian Bale"},
      {name: "Batman", actor: "Christian Bale"},
      {name: "Batman", actor: "Christian Bale"},
      {name: "Batman", actor: "Christian Bale"},
      {name: "Batman", actor: "Christian Bale"},
      {name: "Batman", actor: "Christian Bale"},
      {name: "Batman", actor: "Christian Bale"},
      {name: "Batman", actor: "Christian Bale"},
      {name: "Batman", actor: "Christian Bale"},
      {name: "Batman", actor: "Christian Bale"},
      {name: "Batman", actor: "Christian Bale"},
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {Header: "Title", accessor: "name"},
      {Header: "Lead Actor", accessor: "actor"}
    ], 
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,

    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable({ columns, data, initialState: {sortBy: [{id: 'name', desc: false}]}}, useSortBy, usePagination);

  return (
    <div className="movies">
      <table className = "main-table" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            className="goto"
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
          />
        </span>{' '}
      </div>
    </div>
  )
}

export default App;
