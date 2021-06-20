import { atom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import deepEqual from 'fast-deep-equal';

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

export const stateAtom = atom<AppState>(initialState);
export const ageAtom = selectAtom(stateAtom, (appState) => appState.age, deepEqual);
export const genderAtom = selectAtom(stateAtom, (appState) => appState.gender, deepEqual);
export const nameAtom = selectAtom(stateAtom, (appState) => appState.name, deepEqual);
export const quoteAtom = atom<number | undefined>(
  (get) => {
    const gender = get(genderAtom);
    const age = get(ageAtom);
    if (!gender || age < 10) {
      return;
    }
    return quoteTable[gender].reduce((acc, cur) => (age >= cur.age ? cur.value : acc), 0);
  }
);
