import { configureStore } from "@reduxjs/toolkit";
import productionReducer from "./productionSlice";
import productReducer from "./productSlice";
import materialReducer from "./materialSlice";
import compositionReducer from "./compositionSlice";

export const store = configureStore({
  reducer: {
    production: productionReducer,
    product: productReducer,
    materials: materialReducer,
    compositions: compositionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
