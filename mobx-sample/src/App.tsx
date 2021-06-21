import React from 'react';
import { AppStateContext, AppStateStore } from './AppState';
import { MainPage } from './MainPage';

const App: React.FunctionComponent = () => {
  return (
    <AppStateContext.Provider value={new AppStateStore()}>
      <MainPage />
    </AppStateContext.Provider>
  );
};

export default App;
