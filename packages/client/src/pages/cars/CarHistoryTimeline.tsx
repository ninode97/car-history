import { format } from "date-fns";
import currency from "currency.js";

export type TimelineDateEntry = {
  id: number;
  image: string;
  alt: string;
  firstName: string;
  lastName: string;
  serviceOrProduct: string;
  serviceCompany: string;
  billCode: string;
  price: string;
  code: string;
  createdAt: string;
};

export type TimelineDate = {
  date: string;
  entries: TimelineDateEntry[];
};

const TimelineEntry: React.FC<TimelineDate> = ({ date, entries }) => {
  return (
    <div className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <time className="text-lg font-semibold text-gray-900 dark:text-white">
        {date}
      </time>
      <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a className="items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700">
              <img
                className="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0"
                src={entry.image}
                alt={entry.alt}
              />
              <div className="text-gray-600 dark:text-gray-400">
                <div className="text-base font-normal">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {entry.firstName} {entry.lastName}
                  </span>{" "}
                  added new entry{" "}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {entry.serviceOrProduct}
                  </span>{" "}
                  <div className="font-medium text-indigo-900 dark:text-white">
                    {entry.price}$
                  </div>{" "}
                </div>
                <div className="text-sm font-normal">
                  {entry.serviceCompany} | {entry.billCode} {entry.code}
                </div>
              </div>
            </a>
          </li>
        ))}
        <li>
          <a className="justify-end bg-green-600 items-center block p-3 sm:flex hover:bg-green-600 dark:hover:bg-green-600">
            <div className="text-neutral-100 dark:text-neutral-100">
              <div className="text-base font-normal">
                {entries
                  .map((a) => currency(a.price))
                  .reduceRight((a, b) => a.add(b))
                  .toString()}
                $
              </div>
            </div>
          </a>
        </li>
      </ol>
    </div>
  );
};

export type TimelineEntries = {
  entries: TimelineDate[];
};

const CarHistoryTimeline: React.FC<TimelineEntries> = ({ entries }) => (
  <div>
    {entries.map((entry) => (
      <TimelineEntry
        key={entry.date}
        date={entry.date}
        entries={entry.entries}
      />
    ))}
  </div>
);

export default CarHistoryTimeline;
