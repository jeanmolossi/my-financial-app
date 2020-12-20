import firebase from "firebase/app";
import "firebase/firestore";
import { UserAdapter } from "../../adapters";

import { Balance } from "../../entities";

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
}