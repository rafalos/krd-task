import type { HEADERS } from "./components/Table";

export interface Debt {
  Id: number;
  Name: string;
  NIP: string;
  Date: string;
  Value: number;
  Address: string;
  DocumentType: string;
  Price: number;
  Number: string;
}

export type SortDirection = 'asc' | 'desc';
export type Header = (typeof HEADERS)[number]
