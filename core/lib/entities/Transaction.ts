import { Category } from "./Category";

interface TransactionModel {
  uid: string;
  value: string;
  type: 'income' | 'outcome';
  category: Category;
  identifier: string;
  images: string[];
  created_at: Date;
}

export class Transaction {
  uid: string;
  value: string;
  type: 'income' | 'outcome';
  category: Category;
  identifier: string;
  images: string[];
  created_at: Date;

  constructor ({ uid, value, type, category, identifier, images = [] }: TransactionModel) {
    this.uid = uid;
    this.value = value;
    this.type = type;
    this.category = category;
    this.identifier = identifier;
    this.images = images;
    this.created_at = new Date();
  }
}