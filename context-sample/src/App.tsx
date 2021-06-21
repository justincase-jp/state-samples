import React from 'react';
import { ContextProvider } from './AppState';
import { MainPage } from './MainPage';

const App: React.FunctionComponent = () => {
  return (
    <ContextProvider>
      <MainPage />
    </ContextProvider>
  );
};

export default App;
