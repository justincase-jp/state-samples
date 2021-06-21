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
export const ageAtom = atom<number, number>(
  (get) => get(stateAtom).age,
  (get, set, age) => set(stateAtom, { ...get(stateAtom), age }),
);
export const genderAtom = atom<'male' | 'female' | undefined, 'male' | 'female' | undefined>(
  (get) => get(stateAtom).gender,
  (get, set, gender) => set(stateAtom, { ...get(stateAtom), gender }),
);
export const nameAtom = atom<string | undefined, string | undefined>(
  (get) => get(stateAtom).name,
  (get, set, name) => set(stateAtom, { ...get(stateAtom), name }),
);
export const quoteAtom = selectAtom(
  stateAtom,
  (appState) => {
    const gender = appState.gender;
    const age = appState.age;
    if (!gender || age < 10) {
      return;
    }
    return quoteTable[gender].reduce((acc, cur) => (age >= cur.age ? cur.value : acc), 0);
  },
  deepEqual,
);
