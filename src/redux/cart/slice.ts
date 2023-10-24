import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CartSliceState, TCartItem } from './types';

const initialState: CartSliceState = {
   totalPrice: 0,
   items: [],
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem(state, action: PayloadAction<TCartItem>) {
         const findItem = state.items.find(obj => obj.id === action.payload.id);
         if (findItem) {
            findItem.count++;
         } else {
            state.items.push({
               ...action.payload,
               count: 1,
            });
         }
         state.totalPrice = state.items.reduce((total, obj) => {
            return obj.price * obj.count + total;
         }, 0);
      },
      minusItem(state, action: PayloadAction<string>) {
         const findItem = state.items.find(obj => obj.id === action.payload);
         if (findItem) {
            findItem.count--;
         }
      },
      removeItem(state, action: PayloadAction<string>) {
         state.items = state.items.filter(obj => obj.id !== action.payload);
      },
      clearItem(state) {
         state.items = [];
         state.totalPrice = 0;
      },
   },
});

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;