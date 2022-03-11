import { FieldValue, Timestamp } from "firebase/firestore";

export interface DocumentBase {
  createdAt: Timestamp | FieldValue;
  id: string;
  updatedAt: Timestamp | FieldValue;
}

export type UpdateData<T extends DocumentBase> = Required<Pick<T, "updatedAt">> & Partial<Omit<T, "updatedAt">>;