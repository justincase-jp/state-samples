import React from 'react';
import { Provider } from 'react-redux'
import { MainPage } from './MainPage';
import RootStore from './AppState';

const App: React.FunctionComponent = () => {
  return (
    <Provider store={RootStore}>
      <MainPage />
    </Provider>
  );
};

export default App;
