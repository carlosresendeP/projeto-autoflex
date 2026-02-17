import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type{ Product } from '../types';
import api from '../services/api';

interface ProductState {
  list: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  list: [],
  loading: false,
  error: null,
};

// Buscar todos os produtos
export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await api.get<Product[]>('/products');
  return response.data;
});

// Adicionar novo produto
export const addProduct = createAsyncThunk('products/add', async (newProduct: Omit<Product, 'id'>) => {
  const response = await api.post<Product>('/products', newProduct);
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.list.push(action.payload);
      });
  },
});

export default productSlice.reducer;