import { atom, selector } from 'recoil';

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

export const stateAtom = atom<AppState>({
  key: 'AppState',
  default: initialState,
});
export const ageAtom = selector<number>({
  key: 'AgeSelector',
  get: ({get}) => get(stateAtom).age,
  set: ({get, set}, age) => set(stateAtom, { ...get(stateAtom), age } as AppState)
});
export const genderAtom = selector<'male' | 'female' | undefined>({
  key: 'GenderSelector',
  get: ({get}) => get(stateAtom).gender,
  set: ({get, set}, gender) => set(stateAtom, { ...get(stateAtom), gender } as AppState)
});
export const nameAtom = selector<string | undefined>({
  key: 'NameSelector',
  get: ({get}) => get(stateAtom).name,
  set: ({get, set}, name) => set(stateAtom, { ...get(stateAtom), name } as AppState)
});
export const quoteAtom = selector<number | undefined>({
  key: 'QuoteSelector',
  get: ({get}) => {
    const gender = get(genderAtom);
    const age = get(ageAtom);
    if (!gender || age < 10) {
      return;
    }
    return quoteTable[gender].reduce((acc, cur) => (age >= cur.age ? cur.value : acc), 0);
  },
});
