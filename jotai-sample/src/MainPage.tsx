import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import React, { FunctionComponent } from 'react';
import { nameAtom, quoteAtom, stateAtom } from './AppState';

const NameInput: FunctionComponent = () => {
  const condition = useAtomValue(stateAtom);
  const setCondition = useUpdateAtom(stateAtom);
  return (
    <input
      type='text' 
      size={20} 
      value={condition.name ?? ''} 
      onChange={(e) => {
        const name = e.target.value;
        setCondition({ ...condition, name });
      }}
    />
  );
}

const AgeInput: FunctionComponent = () => {
  const condition = useAtomValue(stateAtom);
  const setCondition = useUpdateAtom(stateAtom);
  return (
    <input 
      type='text' 
      size={4} 
      value={condition.age ? condition.age : ''}
      onChange={(e) => {
        const age = parseInt(e.target.value);
        setCondition({...condition, age: isNaN(age) ? 0 : age });
      }}
    />
  );
}

const GenderInput: FunctionComponent = () => {
  const condition = useAtomValue(stateAtom);
  const setCondition = useUpdateAtom(stateAtom);
  return (
    <>
      <label>
        <input 
          type='radio' 
          name='gender' 
          value='male' 
          checked={condition.gender === 'male'}
          onChange={(e) => setCondition({ ...condition, gender: e.target.value as 'male' | 'female' })}
        />
        男性
      </label>
      <label>
        <input 
          type='radio' 
          name='gender' 
          value='female' 
          checked={condition.gender === 'female'}
          onChange={(e) => setCondition({ ...condition, gender: e.target.value as 'male' | 'female' })}
        />
        女性
      </label>
    </>
  );
}

const Result: FunctionComponent = () => {
  const name = useAtomValue(nameAtom);
  const premium = useAtomValue(quoteAtom);
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
