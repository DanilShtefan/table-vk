export interface Field {
  id: number;
  name: string;
  key: string;
  type: "string" | "number";
}

export interface Record {
  id: number;
  [key: string]: string | number | undefined;
}

export interface PaginatedRecords {
  records: Record[];
  total: number;
}
