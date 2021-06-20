import React from 'react';
import { RecoilRoot } from 'recoil';
import { MainPage } from './MainPage';

const App: React.FunctionComponent = () => {
  return (
    <RecoilRoot>
      <MainPage />
    </RecoilRoot>
  );
};

export default App;
