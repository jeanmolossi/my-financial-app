import { parseToCurrency } from "../utils";

interface BalanceModel {
  uid: string;
  balance: string;
  calc: 'adjust' | 'auto';
  created_at: Date;
}

export class Balance {
  uid: string;
  balance: string;
  calc: 'adjust' | 'auto';
  created_at: Date;

  constructor ({ uid, balance, calc }: BalanceModel) {
    this.uid = uid;
    this.balance = parseToCurrency(balance);
    this.calc = calc;
    this.created_at = new Date();

    return this;
  }

  static new(payload: BalanceModel) {
    const balance = new Balance(payload);
    return {
      ...balance,
      balance: Number(balance.balance)
    }
  }
}