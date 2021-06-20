import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppState = {
  age: number;
  gender?: 'male' | 'female';
  name?: string;
}
const initialState: AppState = {
  age: 20,
};
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

export const appStateSlice = createSlice({
  name: 'AppState',
  initialState,
  reducers: {
    updateAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },
    updateGender: (state, action: PayloadAction<'male' | 'female'>) => {
      state.gender = action.payload;
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  }
});

export const { updateAge, updateGender, updateName } = appStateSlice.actions;

export const selectQuote = (state: AppState): number | undefined => {
  const gender = state.gender;
  const age = state.age;
  if (!gender || age < 10) {
    return;
  }
  return quoteTable[gender].reduce((acc, cur) => (age >= cur.age ? cur.value : acc), 0);
};

export default configureStore({
  reducer: appStateSlice.reducer
});
