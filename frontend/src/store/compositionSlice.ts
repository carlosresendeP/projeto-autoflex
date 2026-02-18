import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Composition } from '../types';
import api from '../services/api';
import type { CompositionFormInput } from '../schemas/compositionSchema';

interface CompositionState {
  list: Composition[];
  loading: boolean;
}

const initialState: CompositionState = {
  list: [],
  loading: false,
};

export const fetchCompositions = createAsyncThunk('compositions/fetchAll', async () => {
  const response = await api.get<Composition[]>('/compositions');
  return response.data;
});

export const addComposition = createAsyncThunk('compositions/add', async (data: CompositionFormInput) => {
  const payload = {
    product: { id: data.productId },
    rawMaterial: { id: data.rawMaterialId },
    quantityRequired: data.quantityRequired
  };
  const response = await api.post<Composition>('/compositions', payload);
  return response.data;
});

export const deleteComposition = createAsyncThunk('compositions/delete', async (id: number) => {
  await api.delete(`/compositions/${id}`);
  return id;
});

const compositionSlice = createSlice({
  name: 'compositions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompositions.fulfilled, (state, action: PayloadAction<Composition[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addComposition.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteComposition.fulfilled, (state, action) => {
        state.list = state.list.filter(c => c.id !== action.payload);
      });
  },
});

export default compositionSlice.reducer;