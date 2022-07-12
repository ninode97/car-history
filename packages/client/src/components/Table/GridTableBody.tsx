import React from "react";
import { useNavigate } from "react-router-dom";

export type GridTableTr = {
  navigateTo: string;
  tds: GridTableTd[];
};
export type GridTableTd = {
  isAction?: boolean;
  key: string;
  value: string;
};

type GridTableBodyProps = {
  children?: JSX.Element[] | JSX.Element;
  entries: GridTableTr[];
};

const GridTableRowAction: React.FC<GridTableTd> = ({ key, value }) => {
  return (
    <td
      key={key}
      className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap"
    >
      <div className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">
        {value}
      </div>
    </td>
  );
};

const GridTableRowElement: React.FC<GridTableTd> = ({ value, key }) => {
  return (
    <td
      key={key}
      className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400"
    >
      {value}
    </td>
  );
};

const GridTableRow: React.FC<GridTableTr> = ({ tds, navigateTo }) => {
  const navigate = useNavigate();

  return (
    <tr
      onClick={() => navigate(navigateTo)}
      className="odd:bg-white even:bg-gray-50 border-b odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600 hover:bg-indigo-100 cursor-pointer"
    >
      {tds.map((td) => {
        if (td.isAction) return <GridTableRowAction {...td} />;
        else return <GridTableRowElement {...td} />;
      })}
    </tr>
  );
};

const GridTableBody: React.FC<GridTableBodyProps> = ({ entries }) => {
  return (
    <tbody>
      {entries.map((entry, index) => (
        //TODO: use nanoid / uuuid to generate keys
        <GridTableRow
          key={index}
          tds={entry.tds}
          navigateTo={entry.navigateTo}
        />
      ))}
    </tbody>
  );
};

export default GridTableBody;
