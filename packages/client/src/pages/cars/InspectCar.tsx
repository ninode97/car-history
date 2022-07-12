import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import DefaultPage from "../DefaultPage";
import DataGrid, { FormatterProps, Column } from "react-data-grid";
import format from "date-fns/format";
import { RootStoreContext } from "../../app/stores/rootStore";
import { InspectPageViewsEnum } from "../../app/stores/carsStore";
import CarHistoryTimeline, { TimelineDate } from "./CarHistoryTimeline";
import { observer } from "mobx-react-lite";
import { first, groupBy } from "lodash";
import currency from "currency.js";

// const columns = [
//   { key: "id", name: "ID" },
//   { key: "title", name: "Title" },
// ];

const columns = [
  { key: "serviceOrProduct", name: "Service / Product" },
  { key: "serviceCompany", name: "Company" },
  { key: "billCode", name: "Bill" },
  { key: "createdAt", name: "Date" },
  { key: "code", name: "Code" },
  { key: "price", name: "Price" },
];

type RowType = {
  id: number | string;
  serviceOrProduct: string;
  serviceCompany: string;
  billCode: string;
  createdAt: string;
  price: string;
  code: string;
  isComputed?: boolean;
};

type Row = number;

function CellFormatter(props: FormatterProps<Row>) {
  return (
    <>
      {props.column.key}&times;{props.row}
    </>
  );
}

const rows: RowType[] = [
  {
    id: 0,
    serviceOrProduct: "Pakabos patikra",
    serviceCompany: "UAB KLASERA",
    billCode: "BOS Nr.2000588",
    createdAt: format(new Date("2020-12-31"), "yyyy.MM.dd"),
    price: (8.26).toFixed(2),
    code: "",
  },
  {
    id: 1,
    serviceOrProduct: "Oro radiatoriaus žarna",
    serviceCompany: "UAB AUTOBOSAS",
    billCode: "IVA Nr.0002889",
    createdAt: format(new Date("2021-01-07"), "yyyy.MM.dd"),
    price: (23.14).toFixed(2),
    code: "MP125",
  },
  {
    id: 2,
    serviceOrProduct: "Ratų guolių kompl.",
    serviceCompany: "UAB AUTOBOSAS",
    billCode: "IVA Nr.0002889",
    createdAt: format(new Date("2021-01-07"), "yyyy.MM.dd"),
    price: (128.93).toFixed(2),
    code: "MP125",
  },
  {
    id: 3,
    serviceOrProduct: "P.K.rato guolio keitimas",
    serviceCompany: "UAB AUTOBOSAS",
    billCode: "IVA Nr.0002889",
    createdAt: format(new Date("2021-01-07"), "yyyy.MM.dd"),
    price: (28.93).toFixed(2),
    code: "MP125",
  },
  {
    id: 4,
    serviceOrProduct: "Interkulertio žarnos keitimas",
    serviceCompany: "UAB AUTOBOSAS",
    billCode: "IVA Nr.0002889",
    createdAt: format(new Date("2021-01-07"), "yyyy.MM.dd"),
    price: (12.4).toFixed(2),
    code: "MP125",
  },
  {
    id: 5,
    serviceOrProduct: "Komp.Diagnostika",
    serviceCompany: "UAB AUTOBOSAS",
    billCode: "IVA Nr.0002889",
    createdAt: format(new Date("2021-01-07"), "yyyy.MM.dd"),
    price: (16.53).toFixed(2),
    code: "MP125",
  },
  {
    id: 6,
    serviceOrProduct: "Eksp.medžiaga",
    serviceCompany: "UAB AUTOBOSAS",
    billCode: "IVA Nr.0002889",
    createdAt: format(new Date("2021-01-07"), "yyyy.MM.dd"),
    price: (1.65).toFixed(2),
    code: "MP125",
  },
  {
    id: 7,
    serviceOrProduct: "Valytuvai",
    serviceCompany: "Inter car",
    billCode: "L31210030295",
    createdAt: format(new Date("2021-04-23"), "yyyy.MM.dd"),
    price: (15.54).toFixed(2),
    code: "MP042",
  },
  {
    id: 8,
    serviceOrProduct: "Akumuliatorius",
    serviceCompany: "Inter car",
    billCode: "L31210030295",
    createdAt: format(new Date("2021-04-23"), "yyyy.MM.dd"),
    price: (54.97).toFixed(2),
    code: "MP042",
  },
];

function transformTableDateIntoTimeline(rows: RowType[]): TimelineDate[] {
  return [...new Set(rows.map((r) => r.createdAt))].map((date) => ({
    date,
    entries: rows
      .filter((r) => r.createdAt === date)
      .map((row) => ({
        ...row,
        id: row.id as any,
        image: "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
        alt: "Jese Leos image",
        firstName: "Jonas",
        lastName: "Vaitkus",
      })),
  }));
}

function computeTotal() {
  const grouped = groupBy(rows, "createdAt");
  Object.keys(grouped).forEach((date) => {
    rows.push({
      id: "",
      serviceOrProduct: "",
      serviceCompany: "",
      billCode: "",
      createdAt: date,
      price: grouped[date]
        .map((a) => currency(a.price))
        .reduceRight((a, b) => a.add(b))
        .toString(),
      code: "",
      isComputed: true,
    });
  });
}

computeTotal();

const InspectCar = () => {
  const { carPageState, changeInspectCarView } =
    useContext(RootStoreContext).carsStore;
  const { carId } = useParams();

  const [expandedGroupIds, setExpandedGroupIds] = useState<
    ReadonlySet<unknown>
  >(() => new Set<unknown>([first(rows)?.createdAt]));

  let DataView: any;
  if (InspectPageViewsEnum.TABLE === carPageState.inspectPageDefaultView) {
    DataView = (
      <DataGrid
        className="h-screen"
        columns={columns}
        rows={rows}
        rowGrouper={groupBy}
        groupBy={["createdAt"]}
        expandedGroupIds={expandedGroupIds}
        onExpandedGroupIdsChange={setExpandedGroupIds}
        rowClass={(row) =>
          row.isComputed
            ? "bg-green-600 hover:bg-green-600 text-neutral-100"
            : undefined
        }
      />
    );
  } else if (
    InspectPageViewsEnum.TIMELINE === carPageState.inspectPageDefaultView
  ) {
    DataView = (
      <CarHistoryTimeline entries={transformTableDateIntoTimeline(rows)} />
    );
  }
  return (
    <DefaultPage>
      <div className="flex justify-end">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => changeInspectCarView(InspectPageViewsEnum.TABLE)}
        >
          Table
        </button>
        <button
          className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
          onClick={() => changeInspectCarView(InspectPageViewsEnum.TIMELINE)}
        >
          Timeline
        </button>
      </div>

      <div>{DataView}</div>
    </DefaultPage>
  );
};

export default observer(InspectCar);
