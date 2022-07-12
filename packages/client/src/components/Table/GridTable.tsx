import React from "react";
import GridTableAction from "./GridTableAction";
import GridTableBody, { GridTableTr } from "./GridTableBody";
import GridTableHeader, { GridTableHeaderEntry } from "./GridTableHeader";

type GridTableProps = {
  children?: JSX.Element[] | JSX.Element;
  headers: GridTableHeaderEntry[];
  entries: GridTableTr[];
  onAddRoute: string;
};

const GridTable: React.FC<GridTableProps> = ({
  headers,
  entries,
  onAddRoute,
}) => {
  return (
    <div className="grid">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <GridTableHeader headers={headers} />
                <GridTableBody entries={entries} />
              </table>
            </div>
          </div>
        </div>
      </div>
      <GridTableAction to={onAddRoute} />
    </div>
  );
};

export default GridTable;
