import React from 'react';
import { Provider } from 'jotai';
import { MainPage } from './MainPage';

const App: React.FunctionComponent = () => {
  return (
    <Provider>
      <MainPage />
    </Provider>
  );
};

export default App;
