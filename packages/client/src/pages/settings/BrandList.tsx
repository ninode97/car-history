import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useExpanded, useTable } from "react-table";
import { useMutation, useQuery } from "react-query";
import agent from "../../app/api/agent";
import { CarModelResponse } from "../../app/models/car";
import { HiArrowNarrowRight, HiArrowNarrowDown } from "react-icons/hi";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";

// This could be inlined into SubRowAsync, this this lets you reuse it across tables
function SubRows({ row, rowProps, visibleColumns, data, loading }: any) {
  const [makeState, setMakeState] = useState<any>({});
  if (loading) {
    return (
      <tr>
        <td />
        <td colSpan={visibleColumns.length - 1}>Loading...</td>
      </tr>
    );
  }

  // error handling here :)

  return (
    <>
      {data.map((x: any, i: any) => {
        return (
          <tr
            className="odd:bg-white even:bg-gray-50 border-b odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600 hover:bg-indigo-100 cursor-pointer"
            {...rowProps}
            key={`${rowProps.key}-expanded-${i}`}
          >
            {row.cells.map((cell: any, j: number) => {
              return (
                <td
                  key={`${rowProps.key}-${i}-cell-${j}`}
                  className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400"
                  {...cell.getCellProps()}
                >
                  {cell.render(cell.column.SubCell ? "SubCell" : "Cell", {
                    value: cell.column.accessor && cell.column.accessor(x, i),
                    row: { ...row, original: x },
                  })}
                </td>
              );
            })}
          </tr>
        );
      })}
      <tr className="odd:bg-white even:bg-gray-50 border-b odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600 hover:bg-indigo-100 cursor-pointer">
        {row.cells.map((cell: any, j: number) => {
          const key = `${rowProps.key}-action-cell-${j}`;
          const name = row.original.name;
          return (
            <td
              key={key}
              className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400"
            >
              {row.cells.length - 2 === j && (
                <input
                  type={"text"}
                  placeholder={"A5"}
                  value={makeState[name] || ""}
                  onChange={(e) => {
                    setMakeState({ ...makeState, [name]: e.target.value });
                  }}
                />
              )}
              {row.cells.length - 1 === j && (
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={(e) => {
                    console.log(makeState);
                    const payload = {
                      name: makeState[name],
                      brandId: row.original.id,
                    };

                    agent.Model.create(payload)
                      .then(console.log)
                      .catch(console.error);
                  }}
                >
                  Add
                </button>
              )}
            </td>
          );
        })}
      </tr>
    </>
  );
}

function SubRowAsync({ row, rowProps, visibleColumns }: any) {
  //  const { brandManagement } = useContext(RootStoreContext);
  const { id } = row.original;
  const cacheKey = `brands-${id}-models`;
  const models = useQuery<any, any, CarModelResponse, any>(
    [cacheKey],
    () => agent.Model.get(id),
    { retry: 0 }
  );
  //brandManagement.updateModels(cacheKey, models.data?.data || []);
  return (
    <div></div>
    //   <SubRows
    //     row={row}
    //     rowProps={rowProps}
    //     visibleColumns={visibleColumns}
    //  //   data={brandManagement.models[cacheKey]}
    //     loading={models.isLoading}
    //   />
  );
}

// A simple way to support a renderRowSubComponent is to make a render prop
// This is NOT part of the React Table API, it's merely a rendering
// option we are creating for ourselves in our table renderer
function Table({ columns: userColumns, data, renderRowSubComponent }: any) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { expanded },
  } = useTable(
    {
      columns: userColumns,
      data,
    },
    useExpanded // We can useExpanded to track the expanded state
    // for sub components too!
  );

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full" {...getTableProps()}>
                <thead className="bg-gray-100 dark:bg-gray-700">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          className={
                            "py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          }
                          {...column.getHeaderProps()}
                        >
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row: any, i) => {
                    prepareRow(row);
                    const rowProps = row.getRowProps();
                    return (
                      // Use a React.Fragment here so the table markup is still valid
                      <React.Fragment key={rowProps.key}>
                        <tr
                          className="odd:bg-white even:bg-gray-50 border-b odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600 hover:bg-indigo-100 cursor-pointer"
                          {...rowProps}
                        >
                          {row.cells.map((cell: any) => {
                            return (
                              <td
                                className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400"
                                {...cell.getCellProps()}
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                        {/* We could pass anything into this */}
                        {row.isExpanded &&
                          renderRowSubComponent({
                            row,
                            rowProps,
                            visibleColumns,
                          })}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
    </>
  );
}

function BrandList({ brands }: any) {
  const columns = React.useMemo(
    () => [
      {
        // Make an expander cell
        Header: () => null, // No header
        id: "expander", // It needs an ID
        Cell: ({ row }: any) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? <HiArrowNarrowRight /> : <HiArrowNarrowDown />}
          </span>
        ),
        // We can override the cell renderer with a SubCell to be used with an expanded row
        SubCell: () => null, // No expander on an expanded row
      },
      {
        Header: "Car Brands",
        columns: [
          {
            Header: "Name",
            // We re-map data using accessor functions for subRows
            accessor: (d: any) => d.name,
            // We can render something different for subRows
            SubCell: (cellProps: any) => cellProps.value,
          },
        ],
      },
    ],
    []
  );

  const data = React.useMemo(() => brands, []);

  // Create a function that will render our row sub components
  const renderRowSubComponent = React.useCallback(
    ({ row, rowProps, visibleColumns }) => (
      <SubRowAsync
        key={`subrowasync-${row.original.id}`}
        row={row}
        rowProps={rowProps}
        visibleColumns={visibleColumns}
      />
    ),
    []
  );

  return (
    <Table
      columns={columns}
      data={data}
      // We added this as a prop for our table component
      // Remember, this is not part of the React Table API,
      // it's merely a rendering option we created for
      // ourselves
      renderRowSubComponent={renderRowSubComponent}
    />
  );
}

export default observer(BrandList);
