import type { Timestamp } from "firebase/firestore";

export interface TransactionDocument {
  uid: string;
  amount: string;
  category: string;
  createdAt: Timestamp;
  date: string;
  description: string;
  notes: string;
  type: string;
  lastUpdated?: Timestamp;
}

export interface Transaction extends TransactionDocument {
  id: string;
}

export interface BudgetDocument {
  uid: string;
  amount: string;
  category: string;
  date: string;
  updatedTime?: Timestamp;
}

export interface Budget extends BudgetDocument {
  id: string;
}