import { configureStore } from '@reduxjs/toolkit';
import productionReducer from './productionSlice';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: {
    production: productionReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;