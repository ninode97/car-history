import React, { useMemo, useState } from "react";
import DefaultPage from "../DefaultPage";
import Select from "react-select";
import { useMutation, useQuery } from "react-query";

import api from "../../app//api/agent";
import {
  GetHistoryResponse,
  GetUniquePlatesResponse,
  HistoryRecord,
  NewHistoryRecord,
} from "../../app/models/history";
import useDebounce from "../../app/hooks/useDebounce";
import TextInput from "../../app/common/FormInputs/TextInput";

const History = () => {
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: string;
  }>({
    label: "",
    value: "",
  });
  const [term, setTerm] = useState<string>("");

  const [historyRecord, setHistoryRecord] = useState<NewHistoryRecord>({
    plate: selectedOption?.value || "",
    vin: "",
    category: "",
    info: "",
  });

  const uniquePlatesRequest = useQuery<any, any, GetUniquePlatesResponse, any>(
    ["uniquePlates", selectedOption],
    () => api.History.uniquePlates(),
    {
      retry: 0,
      refetchInterval: 0,
      refetchOnWindowFocus: false,
    }
  );

  const historyEntriesRequest = useQuery<any, any, GetHistoryResponse, any>(
    ["historyEntries", selectedOption.value],
    () => api.History.get({ plate: selectedOption?.value || "" })
  );

  const addHistoryRequest = useMutation(api.History.append, {
    onSuccess: (data) => {
      console.log(data);
      const message = "success";
      alert(message);
    },
    onError: () => {
      alert("there was an error");
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries("create");
    // },
  });

  const options = (uniquePlatesRequest.data?.data || []).map((opt) => ({
    value: opt,
    label: opt,
  }));

  const entries = historyEntriesRequest.data?.data || [];
  console.log({
    entries,
  });
  return (
    <DefaultPage>
      <div className="md:grid md:grid-cols-1 md:gap-6 mb-8">
        <div className="mt-5 md:mt-0 md:col-span-2 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addHistoryRequest.mutate({
                plate: historyRecord.plate,
                body: historyRecord,
              });
            }}
          >
            {addHistoryRequest.isLoading && (
              <div>Adding new history record...</div>
            )}
            {historyEntriesRequest.isLoading && (
              <div>Loading history records...</div>
            )}

            <Select
              className="mb-4"
              isLoading={uniquePlatesRequest.isLoading}
              value={selectedOption}
              onInputChange={(text: string) => setTerm(text)}
              placeholder="Plate Code"
              defaultValue={selectedOption}
              onChange={(value: any) => {
                setSelectedOption(value);
                setHistoryRecord({
                  ...historyRecord,
                  plate: value.value,
                });
              }}
              isClearable={true}
              options={options}
              noOptionsMessage={() => (
                <div>No history records found for: {term}</div>
              )}
            />
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              {selectedOption?.value && (
                <div
                  className="px-4 py-5 bg-white space-y-6 sm:p-6"
                  style={{
                    border: "1px solid gainsboro",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      border: "1px solid gainsboro",
                    }}
                  >
                    <div style={{ padding: "1rem" }}>Category</div>
                    <div style={{ padding: "1rem" }}>Info</div>
                  </div>
                  {entries.map((entry) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                      key={entry.id}
                    >
                      <div style={{ padding: "1rem" }}>{entry.category}</div>
                      <div style={{ padding: "1rem" }}>{entry.info}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-1 gap-6">
                  <TextInput
                    value={historyRecord.plate}
                    onChange={(e) =>
                      setHistoryRecord({
                        ...historyRecord,
                        plate: e.target.value,
                      })
                    }
                    label="Plate"
                    placeHolder="AAA:000"
                    name="plate"
                  />
                  <TextInput
                    value={historyRecord.category || ""}
                    onChange={(e) =>
                      setHistoryRecord({
                        ...historyRecord,
                        category: e.target.value,
                      })
                    }
                    label="Category"
                    placeHolder="Engine"
                    name="category"
                  />
                  <TextInput
                    value={historyRecord.vin || ""}
                    onChange={(e) =>
                      setHistoryRecord({
                        ...historyRecord,
                        vin: e.target.value,
                      })
                    }
                    label="VIN"
                    placeHolder="WY00000000000"
                    name="vin"
                  />
                  <TextInput
                    value={historyRecord.info}
                    onChange={(e) =>
                      setHistoryRecord({
                        ...historyRecord,
                        info: e.target.value,
                      })
                    }
                    label="Info"
                    placeHolder="Changed oil"
                    name="info"
                  />
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-8">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DefaultPage>
  );
};

export default History;
