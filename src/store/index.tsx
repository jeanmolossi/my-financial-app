import React from 'react';
import { StoreAppProvider } from './app';

const StoreProvider: React.FC = ({ children }) => {
  return (
    <StoreAppProvider>
      {children}
    </StoreAppProvider>
  );
}

export default StoreProvider;