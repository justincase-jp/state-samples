import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';

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

export class AppStateStore {
  public age: number = 20;
  public gender?: 'male' | 'female';
  public name?: string;

  constructor() {
    makeAutoObservable(this);
  }

  get quote(): number | undefined {
    if (!this.gender || this.age < 10) {
      return;
    }
    return quoteTable[this.gender].reduce((acc, cur) => (this.age >= cur.age ? cur.value : acc), 0);
  }
}
const defaultStore = new AppStateStore();
export const AppStateContext = createContext<AppStateStore>(defaultStore);
