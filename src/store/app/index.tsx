import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { appReducer, INITIAL_STATE } from './reducer';
import { AppState, AppActions } from './types';

interface AppContextProps {
  app: AppState;
  dispatch: Dispatch<AppActions>
}

const AppContext = createContext({} as AppContextProps);

const StoreAppProvider: React.FC = ({ children }) => {
  const [app, dispatch] = useReducer(appReducer, INITIAL_STATE);

  return (
    <AppContext.Provider value={{
      app,
      dispatch
    }}>
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = useContext(AppContext);
  return context;
}

export * from './actions';
export * from './types';
export { StoreAppProvider, useAppContext };