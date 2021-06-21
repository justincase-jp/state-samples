import create from 'zustand';

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
type AppStateUpdater = {
  updateAge: (age: number) => void;
  updateGender: (gender: 'male' | 'female' | undefined) => void;
  updateName: (name: string | undefined) => void;
}

export const useStore = create<AppState & AppStateUpdater>((set) => ({
  // -- state
  age: 20,
  gender: undefined,
  name: undefined,
  // -- updater
  updateAge: (age) => set({ age }),
  updateGender: (gender) => set({ gender }),
  updateName: (name) => set({ name }),
}));

export const selectQuote = (state: AppState): number | undefined => {
  const gender = state.gender;
  const age = state.age;
  if (!gender || age < 10) {
    return;
  }
  return quoteTable[gender].reduce((acc, cur) => (age >= cur.age ? cur.value : acc), 0);
};
