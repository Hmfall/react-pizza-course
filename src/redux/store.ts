import { configureStore } from '@reduxjs/toolkit';
import cart from './cart/slice';
import filter from './filter/slice';
import pizza from './pizza/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
   reducer: {
      filter,
      cart,
      pizza,
   },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;


