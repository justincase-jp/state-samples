import React from 'react';
import { AppStateContext, AppStateStore } from './AppStateStore';
import { MainPage } from './MainPage';

const App: React.FunctionComponent = () => {
  return (
    <AppStateContext.Provider value={new AppStateStore()}>
      <MainPage />
    </AppStateContext.Provider>
  );
};

export default App;
