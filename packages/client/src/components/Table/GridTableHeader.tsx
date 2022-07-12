import React from "react";
import { useTranslation } from "react-i18next";

export type GridTableHeaderEntry = {
  key: string;
  isAction?: boolean;
  label: string;
};
type GridTableHeaderProps = {
  headers: GridTableHeaderEntry[];
};

type EntryProps = {
  key?: string;
  label: string;
};

const TableEntry: React.FC<EntryProps> = ({ label, key }) => {
  return (
    <th
      key={key}
      scope="col"
      className={`${"py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"}`}
    >
      {label}
    </th>
  );
};

const EmptyEntry: React.FC<EntryProps> = ({ label, key }) => {
  return (
    <th key={key} scope="col" className="relative py-3 px-6">
      <span className="sr-only"> {label}</span>
    </th>
  );
};

const GridTableHeader: React.FC<GridTableHeaderProps> = ({ headers }) => {
  const { t } = useTranslation();
  return (
    <thead className="bg-gray-100 dark:bg-gray-700">
      <tr>
        {headers.map((h) =>
          h.isAction ? (
            <EmptyEntry label={t(h.label)} />
          ) : (
            <TableEntry label={t(h.label)} />
          )
        )}
      </tr>
    </thead>
  );
};

export default GridTableHeader;
