import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzaSliceState, Status, Pizza } from '../pizza/types';

const initialState: PizzaSliceState = {
   items: [],
   status: Status.LOADING,
};

export type SearchPizzaParams = {
   sortBy: string;
   order: string;
   category: string;
   search: string;
   currentPage: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
   'pizza/fetchPizzasStatus',
   async (params) => {
      const { sortBy, order, category, search, currentPage } = params;
      const { data } = await axios.get<Pizza[]>(
         `${process.env.REACT_APP_BASE_URL}/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      );
      return data;
   });

const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchPizzas.pending, (state) => {
         state.status = Status.LOADING;
         state.items = [];
      });
      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
         state.items = action.payload;
         state.status = Status.SUCCESS;
      });
      builder.addCase(fetchPizzas.rejected, (state) => {
         state.status = Status.ERROR;
         state.items = [];
      });
   },
});

export default pizzaSlice.reducer;