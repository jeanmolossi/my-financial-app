import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { parseCurrencyInputToNumber } from '../utils';
import { authUser } from './userRepository';

export async function getMyLastBalance() {
  const currentUser = authUser();

  const { uid } = currentUser;

  return firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('balance')
    .orderBy('created_at', 'desc')
    .limit(1)
    .get()
    .then(response => ({
      balance: response.docs[0].data(),
      status: 'RESOLVE'
    }))
    .catch(() => ({
      balance: {
        balance: 0,
        created_at: new Date()
      },
      status: 'REJECT'
    }))

}

export async function updateMyBalance(type: 'income' | 'outcome', value: number) {
  const user = authUser();

  const { balance } = await getMyLastBalance().then(response => ({ balance: response?.balance.balance }));

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
  const user = authUser();

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