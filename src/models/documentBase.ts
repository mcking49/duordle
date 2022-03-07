import { FieldValue, Timestamp } from "firebase/firestore";

export interface DocumentBase {
  createdAt: Timestamp | FieldValue;
  id: string;
  updatedAt: Timestamp | FieldValue;
}
