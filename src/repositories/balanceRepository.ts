import { BalanceAdapter } from 'financial-core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { parseCurrencyInputToNumber } from '../utils';
import { authUser } from './userRepository';

export async function getMyLastBalance() {
  const balanceAdapter = new BalanceAdapter();

  return balanceAdapter.getMyLastBalance();
}

export async function updateMyBalance(type: 'income' | 'outcome', value: number) {
  const user = await authUser();

  const { balance } = await getMyLastBalance().then(response => ({ balance: response?.balance }));

  const newBalance: number = type === 'income' ? Number(balance) + value : Number(balance) - value;

  return firebase
    .firestore()
    .collection(`users/${user.uid}/balance`)
    .add({
      balance: newBalance,
      calc: 'auto',
      created_at: new Date()
    })
    .then(() => ({ status: 'RESOLVE' }))
    .catch(() => ({ status: 'REJECT' }))
}

export async function adjustMyBalance(value: string) {
  const user = await authUser();

  const balance = parseCurrencyInputToNumber(value);

  return firebase
    .firestore()
    .collection(`users/${user.uid}/balance`)
    .add({
      balance,
      calc: 'adjust',
      created_at: new Date()
    })
    .then(() => ({ status: 'RESOLVE' }))
    .catch(() => ({ status: 'REJECT' }))
}