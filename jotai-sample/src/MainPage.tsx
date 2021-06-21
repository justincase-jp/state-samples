import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import React, { FunctionComponent } from 'react';
import { ageAtom, genderAtom, nameAtom, quoteAtom } from './AppState';

const NameInput: FunctionComponent = () => {
  const name = useAtomValue(nameAtom);
  const setName = useUpdateAtom(nameAtom);
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
  const age = useAtomValue(ageAtom);
  const setAge = useUpdateAtom(ageAtom);
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
  const gender = useAtomValue(genderAtom);
  const setGender = useUpdateAtom(genderAtom);
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
