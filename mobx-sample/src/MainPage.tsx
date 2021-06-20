import { observer } from 'mobx-react-lite';
import React, { FunctionComponent, useContext } from 'react';
import { AppStateContext } from './AppStateStore';

const NameInput = observer(() => {
  const appState = useContext(AppStateContext);
  return (
    <input
      type='text' 
      size={20} 
      value={appState.name ?? ''} 
      onChange={(e) => {
        appState.name = e.target.value;
      }}
    />
  );
});

const AgeInput = observer(() => {
  const appState = useContext(AppStateContext);
  return (
    <input 
      type='text' 
      size={4} 
      value={appState.age ? appState.age : ''}
      onChange={(e) => {
        const age = parseInt(e.target.value);
        appState.age = isNaN(age) ? 0 : age;
      }}
    />
  );
});

const GenderInput = observer(() => {
  const appState = useContext(AppStateContext);
  return (
    <>
      <label>
        <input 
          type='radio' 
          name='gender' 
          value='male' 
          checked={appState.gender === 'male'}
          onChange={(e) => {
            appState.gender = e.target.value as 'male' | 'female';
          }}
        />
        男性
      </label>
      <label>
        <input 
          type='radio' 
          name='gender' 
          value='female' 
          checked={appState.gender === 'female'}
          onChange={(e) => (appState.gender = e.target.value as 'male' | 'female')}
        />
        女性
      </label>
    </>
  );
});

const Result = observer(() => {
  const appState = useContext(AppStateContext);
  return (
    <dl>
      <dt>見積り {appState.name ? `[${appState.name}さま]` : ''}</dt>
      <dd>{appState.quote ?? '--'} 円</dd>
    </dl>
  );
});

export const MainPage: FunctionComponent = () => (
  <>
    <dl>
      <dt>名前</dt>
      <dd><NameInput /></dd>
      <dt>年齢</dt>
      <dd><AgeInput /> 歳</dd>
      <dt>性別</dt>
      <dd><GenderInput /></dd>
    </dl>
    <hr />
    <Result />
  </>
);
