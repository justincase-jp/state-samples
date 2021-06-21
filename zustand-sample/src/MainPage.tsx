import React, { FunctionComponent } from 'react';
import { selectQuote, useStore } from './AppState';

const NameInput: FunctionComponent = () => {
  const name = useStore(state => state.name);
  const setName = useStore(state => state.updateName);
  return (
    <input
      type='text' 
      size={20} 
      value={name ?? ''} 
      onChange={(e) => setName(e.target.value)}
    />
  );
}

const AgeInput: FunctionComponent = () => {
  const age = useStore(state => state.age);
  const setAge = useStore(state => state.updateAge);
  return (
    <input 
      type='text' 
      size={4} 
      value={age ? age : ''}
      onChange={(e) => {
        const age = parseInt(e.target.value);
        setAge(isNaN(age) ? 0 : age);
      }}
    />
  );
}

const GenderInput: FunctionComponent = () => {
  const gender = useStore(state => state.gender);
  const setGender = useStore(state => state.updateGender);
  return (
    <>
      <label>
        <input 
          type='radio' 
          name='gender' 
          value='male' 
          checked={gender === 'male'}
          onChange={(e) => setGender(e.target.value as 'male' | 'female')}
        />
        男性
      </label>
      <label>
        <input 
          type='radio' 
          name='gender' 
          value='female' 
          checked={gender === 'female'}
          onChange={(e) => setGender(e.target.value as 'male' | 'female')}
        />
        女性
      </label>
    </>
  );
}

const Result: FunctionComponent = () => {
  const name = useStore(state => state.name);
  const premium = useStore(selectQuote);
  return (
    <dl>
      <dt>見積り {name ? `[${name}さま]` : ''}</dt>
      <dd>{premium ?? '--'} 円</dd>
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
