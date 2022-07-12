export type HistoryRecord = {
  id: number;
  plate: string;
  vin: string | null;
  category: string | null;
  info: string;
};

export type NewHistoryRecord = Omit<HistoryRecord, "id">;

export type GetHistoryRequest = {
  plate: string;
};
export type GetHistoryResponse = {
  data: HistoryRecord[];
};
export type PostHistoryRecordRequest = {
  plate: string;
  body: NewHistoryRecord;
};

export type PostHistoryRecordResponse = {
  data: HistoryRecord;
};

export type GetUniquePlatesResponse = {
  data: string[];
};
