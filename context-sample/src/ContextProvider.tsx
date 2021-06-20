import React, { createContext, useContext, useState, Dispatch, FunctionComponent, SetStateAction } from 'react';

// --- a table for premium quote
const quoteTable = {
  male: [
    { age: 10, value: 100 },
    { age: 20, value: 200 },
    { age: 30, value: 300 },
    { age: 40, value: 400 },
    { age: 50, value: 500 },
    { age: 60, value: 600 },
  ],
  female: [
    { age: 10, value: 100 },
    { age: 20, value: 250 },
    { age: 30, value: 350 },
    { age: 40, value: 380 },
    { age: 50, value: 450 },
    { age: 60, value: 570 },
  ],
};

// --- app state
export type AppState = {
  age: number;
  gender?: 'male' | 'female';
  name?: string;
}
const initialState: AppState = {
  age: 20,
};

type Dispatcher<T> = Dispatch<SetStateAction<T>>;

const StateContext = createContext<AppState>(initialState);
const SetStateContext = createContext<Dispatcher<AppState>>(() => {});

export const useStateContext = (): AppState => (useContext(StateContext));
export const useSetStateContext = (): Dispatcher<AppState> => (useContext(SetStateContext));

export const quotePremium = (state: AppState): number | undefined => {
  const gender = state.gender
  if (!gender || state.age < 10) {
    return;
  }
  return quoteTable[gender].reduce((acc, cur) => (state.age >= cur.age ? cur.value : acc), 0);
};

export const ContextProvider: FunctionComponent = (props) => {
  const [state, setState] = useState<AppState>(initialState);
  return (
    <StateContext.Provider value={state}>
      <SetStateContext.Provider value={setState}>{props.children}</SetStateContext.Provider>
    </StateContext.Provider>
  );
};
