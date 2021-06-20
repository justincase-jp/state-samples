import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { AppState, selectQuote, updateAge, updateGender, updateName } from './AppState';

const NameInput: FunctionComponent = () => {
  const name = useSelector<AppState, string | undefined>((state) => state.name);
  const dispatch = useDispatch();
  return (
    <input
      type='text' 
      size={20} 
      value={name ?? ''} 
      onChange={(e) => dispatch(updateName(e.target.value))}
    />
  );
}

const AgeInput: FunctionComponent = () => {
  const age = useSelector<AppState, number>((state) => state.age);
  const dispatch = useDispatch();
  return (
    <input 
      type='text' 
      size={4} 
      value={age ? age : ''}
      onChange={(e) => {
        const age = parseInt(e.target.value);
        dispatch(updateAge(isNaN(age) ? 0 : age));
      }}
    />
  );
}

const GenderInput: FunctionComponent = () => {
  const gender = useSelector<AppState, 'male' | 'female' | undefined>((state) => state.gender);
  const dispatch = useDispatch();
  return (
    <>
      <label>
        <input 
          type='radio' 
          name='gender' 
          value='male' 
          checked={gender === 'male'}
          onChange={(e) => dispatch(updateGender(e.target.value as 'male' | 'female'))}
        />
        男性
      </label>
      <label>
        <input 
          type='radio' 
          name='gender' 
          value='female' 
          checked={gender === 'female'}
          onChange={(e) => dispatch(updateGender(e.target.value as 'male' | 'female'))}
        />
        女性
      </label>
    </>
  );
}

const Result: FunctionComponent = () => {
  const name = useSelector<AppState, string | undefined>((state) => state.name);
  const premium = useSelector(selectQuote);
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
