import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { UserAdapter } from 'financial-core';


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
  const userAdapter = new UserAdapter();
  const { updateUser, user } = useAuth();

  useEffect(() => {
    userAdapter.onAuthStateChanged(function(user) {      
      updateUser(user);
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