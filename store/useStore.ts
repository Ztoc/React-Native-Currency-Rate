import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CurrencyRate } from '../constants/Types';

export const useStore = create(
  persist<{
    rates: CurrencyRate[];
    setRates: (rates: CurrencyRate[]) => void;
  }>(
    (set) => ({
      rates: [],
      setRates: (rates) => set({ rates }),
    }),
    {
      name: 'currency-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
