import { BalanceAdapter } from 'financial-core';

export async function getMyLastBalance() {
  const balanceAdapter = new BalanceAdapter();

  return balanceAdapter.getMyLastBalance();
}

export async function updateMyBalance(type: 'income' | 'outcome', value: number) {
  const balanceAdapter =  new BalanceAdapter();

  return balanceAdapter.updateMyBalance(type, value);
}

export async function adjustMyBalance(value: string) {
  const balanceAdapter = new BalanceAdapter();

  return balanceAdapter.adjustMyBalance(value);
}

export async function subscribeMyBalance(callback: (balance: string) => void): Promise<() => void> {
  const balanceAdapter = new BalanceAdapter();

  return balanceAdapter.subscribeMyBalance(callback);
}