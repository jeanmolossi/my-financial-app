import { Transaction, TransactionAdapter, TransactionPayload } from 'financial-core';

export async function addNewTransaction({
  identifier,
  category,
  type,
  value,
  images = []
}: TransactionPayload) {
  const transactionAdapter = new TransactionAdapter();

  return transactionAdapter.addNewTransaction({
    identifier,
    category,
    type,
    value,
    images
  });
}

export async function getMyTransactions() {
  const transactionAdapter = new TransactionAdapter();

  return transactionAdapter.getMyTransactions();
}

export async function subscribeTransactions(callback: (transactions: Transaction[]) => void) {
  const transactionAdapter = new TransactionAdapter();

  return transactionAdapter.subscribeTransactions(callback);
}
