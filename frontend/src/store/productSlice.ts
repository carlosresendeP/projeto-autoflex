import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Product } from "../types";
import api from "../services/api";

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
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const response = await api.get<Product[]>("/products");
  return response.data;
});

// Adicionar novo produto
export const addProduct = createAsyncThunk(
  "products/add",
  async (newProduct: Omit<Product, "id">) => {
    const response = await api.post<Product>("/products", newProduct);
    return response.data;
  },
);

//editar o produto com o id
export const editProduct = createAsyncThunk(
  "products/edit",
  async (updatedProduct: Product) => {
    const response = await api.put<Product>(
      `/products/${updatedProduct.id}`,
      updatedProduct,
    );
    return response.data;
  },
);

//deletar o produto com o id
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number) => {
    await api.delete(`/products/${id}`);
    return id;
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.list = action.payload;
        },
      )
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.list.push(action.payload);
        },
      )
      .addCase(
        editProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const index = state.list.findIndex((p) => p.id === action.payload.id);
          if (index !== -1) state.list[index] = action.payload;
        },
      )
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.list = state.list.filter((p) => p.id !== action.payload);
        },
      );
  },
});

export default productSlice.reducer;
