import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React, { useEffect } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import AuthTabs from './Auth';
import { getAuthUser } from '../repositories';
import { Home, Welcome } from '../screens';
import { useAuth, User } from '../hooks/Auth';

const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
  headerTitle: () => null,
  headerShown: false
};


const Router: React.FC = () => {
  const { updateUser, user } = useAuth();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        getAuthUser().then(user => {
          if(user){
            updateUser(user);
          }
        })
        return;
      }

      updateUser({} as User);
    }, () => {
      console.log('Erro')
    }, () => { 
      console.log('UNSUB')
    })
  }, []);

  return (    
    <Stack.Navigator {...{ screenOptions }}>
      {user.uid
        ? <Stack.Screen name="Home" component={AuthTabs} />
        : <Stack.Screen name="Welcome" component={Welcome} />}
    </Stack.Navigator>
  );
}

export default Router;