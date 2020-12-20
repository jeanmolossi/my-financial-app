import { Transaction, TransactionAdapter, UserAdapter } from 'financial-core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { parseCurrencyInputToNumber } from '../utils';
import { updateMyBalance } from './balanceRepository';
import { authUser, getAuthUser } from './userRepository';

interface TransacionPayload {
  value: string;
  type: 'income' | 'outcome';
  category: string;
  identifier: string;
  images?: string[];
}

// export async function addNewTransaction({
//   identifier,
//   category,
//   type,
//   value,
//   images = []
// }: TransacionPayload) {
//   const user = authUser();

//   const centValue = parseCurrencyInputToNumber(value);

//   const firebaseStorage = await UploadImages(images);

//   const response = await firebase
//     .firestore()
//     .collection('users')
//     .doc(user.uid)
//     .collection('transactions')
//     .add({
//       identifier,
//       category,
//       type,
//       value: centValue,
//       images: firebaseStorage,
//       created_at: new Date()
//     })
//     .then(response => response.get().then(doc => doc))
//     .then(doc => ({
//       transaction: { ...doc.data(), uid: doc.id },
//       status: 'RESOLVE'
//     }))
//     .catch(() => ({
//       transaction: null,
//       status: 'REJECT'
//     }))

//   let status = response.status;

//   if(status === 'RESOLVE') {
//     status = await updateMyBalance(type, Number(centValue))
//       .then(response => response.status)
//       .catch(() => 'REJECT')
//   }

//   return {
//     transaction: response.transaction,
//     status
//   };
// }

export async function getMyTransactions() {
  const transactionAdapter = new TransactionAdapter();

  const transactions = transactionAdapter.getMyTransactions();
  return transactions;
}

export async function subscribeTransactions(callback: (transactions: Transaction[]) => void) {
  const transactionAdapter = new TransactionAdapter();

  return transactionAdapter.subscribeTransactions(callback);
}


// async function UploadImages(images: string[]) {
//   const currentUser = authUser();

//   const fetchImages = images.map(async uri => {
//     const image = await fetch(uri);
//     const blobImage = await image.blob();

//     return blobImage;
//   })

//   const resolvedImages = await Promise.all(fetchImages);

//   const storageRef = firebase
//     .storage()
//     .ref(`/transactions/${currentUser.uid}/`);

//   const imagesURIs = resolvedImages.map(async singleImage => {
//     return storageRef
//       .child(Date.now().toString())
//       .put(singleImage)
//       .then(reference => reference.ref.getDownloadURL());
//   })

//   const URIs = await Promise.all(imagesURIs);

//   return URIs;
// }