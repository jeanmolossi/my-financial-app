import firebase from "firebase/app";
import "firebase/firestore";
import { stat } from "fs";
import { UserAdapter } from "../../adapters";

import { Balance } from "../../entities";
import { parseCurrencyInputToNumber } from "../../utils";

export class BalanceRepository {
  async getMyLastBalance(): Promise<Balance> {
    const userAdapter = new UserAdapter();
    const currentUser = await userAdapter.getAuthUser();

    const { uid } = currentUser;

    const balance = await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('balance')
      .orderBy('created_at', 'desc')
      .limit(1)
      .get()
      .then(response => response.docs[0].data() as Balance)
      .catch(() => null);

    if(!balance) {
      throw new Error('Sem balanço')
    }

    return new Balance({
      ...balance,
      balance: balance.balance.toString()
    });
  }

  async updateMyBalance(type: 'income' | 'outcome', value: number) {
    const userAdapter = new UserAdapter();
    
    const user = await userAdapter.getAuthUser();

    const { balance } = await this
      .getMyLastBalance()
      .then(response => ({ balance: response?.balance }));
  
    const newBalance: number = type === 'income' ? Number(balance) + value : Number(balance) - value;
  
    const { status, balanceDoc } = await firebase
      .firestore()
      .collection(`users/${user.uid}/balance`)
      .add({
        balance: newBalance,
        calc: 'auto',
        created_at: new Date()
      })
      .then((doc) => ({ status: 'RESOLVE', balanceDoc: doc.get() }))
      .catch(() => ({ status: 'REJECT', balanceDoc: null }))

    if(status !== 'RESOLVE' || !balanceDoc)
      throw new Error('Balance not updated');

    const balanceResponse = await balanceDoc.then(doc => ({
      ...doc.data(),
      uid: doc.id,
    } as Balance))

    return new Balance({ ...balanceResponse })
  }

  async adjustMyBalance(value: string) {
    const userAdapter = new UserAdapter();

    const user = await userAdapter.getAuthUser();
  
    const balance = parseCurrencyInputToNumber(value);
  
    const { doc, status } = await firebase
      .firestore()
      .collection(`users/${user.uid}/balance`)
      .add({
        balance,
        calc: 'adjust',
        created_at: new Date()
      })
      .then((doc) => ({ status: 'RESOLVE', doc: doc.get() }))
      .catch(() => ({ status: 'REJECT', doc: null }))

    if(status === 'REJECT' || !doc)
      throw new Error('Ocorreu um erro ao ajustar seu balanço');

    return doc.then(doc => ({
      ...doc.data(),
      uid: doc.id
    } as Balance))
  }

  async subscribeMyBalance(callback: (balance: string) => void): Promise<() => void> {
    const userAdapter = new UserAdapter();

    return userAdapter.getAuthUser()
      .then(({ uid }) => {
        const unsubscribeBalance = firebase
        .firestore()
        .collection(`users/${uid}/balance`)
        .orderBy('created_at', 'desc')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if(change) {
              this.getMyLastBalance()
                .then(response => {
                  if(!response) {
                    throw new Error('No balance loaded')
                  }

                  
                  callback(response.balance);
                });
            }
          })
        })

        return unsubscribeBalance;
      });
  }
}