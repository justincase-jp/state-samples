import React, { FunctionComponent } from 'react';
import { quotePremium, useSetStateContext, useStateContext } from './ContextProvider';

const NameInput: FunctionComponent = () => {
  const appState = useStateContext();
  const setAppState = useSetStateContext();
  return (
    <input
      type='text' 
      size={20} 
      value={appState.name ?? ''} 
      onChange={(e) => setAppState({ ...appState, name: e.target.value })}
    />
  );
}

const AgeInput: FunctionComponent = () => {
  const appState = useStateContext();
  const setAppState = useSetStateContext();
  return (
    <input 
      type='text' 
      size={4} 
      value={appState.age ? appState.age : ''}
      onChange={(e) => {
        const age = parseInt(e.target.value);
        setAppState({...appState, age: isNaN(age) ? 0 : age });
      }}
    />
  );
}

const GenderInput: FunctionComponent = () => {
  const appState = useStateContext();
  const setAppState = useSetStateContext();
  return (
    <>
      <label>
        <input 
          type='radio' 
          name='gender' 
          value='male' 
          checked={appState.gender === 'male'}
          onChange={(e) => setAppState({ ...appState, gender: e.target.value as 'male' | 'female' })}
        />
        男性
      </label>
      <label>
        <input 
          type='radio' 
          name='gender' 
          value='female' 
          checked={appState.gender === 'female'}
          onChange={(e) => setAppState({ ...appState, gender: e.target.value as 'male' | 'female' })}
        />
        女性
      </label>
    </>
  );
}

const Result: FunctionComponent = () => {
  const appState = useStateContext();
  return (
    <dl>
      <dt>見積り {appState.name ? `[${appState.name}さま]` : ''}</dt>
      <dd>{quotePremium(appState) ?? '--'} 円</dd>
    </dl>
  );
}

export const MainPage: FunctionComponent = () => {
  return (
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
}
