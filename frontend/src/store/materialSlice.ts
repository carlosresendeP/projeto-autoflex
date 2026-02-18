import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RawMaterial } from "../types";
import api from "../services/api";

interface MaterialState {
  list: RawMaterial[];
  loading: boolean;
}

const initialState: MaterialState = {
  list: [],
  loading: false,
};

export const fetchMaterials = createAsyncThunk(
  "materials/fetchAll",
  async () => {
    const response = await api.get<RawMaterial[]>("/materials");
    return response.data;
  },
);

export const addMaterial = createAsyncThunk(
  "materials/add",
  async (newMaterial: Omit<RawMaterial, "id">) => {
    const response = await api.post<RawMaterial>("/materials", newMaterial);
    return response.data;
  },
);

export const editMaterial = createAsyncThunk(
  "materials/edit",
  async (updatedMaterial: RawMaterial) => {
    const response = await api.put<RawMaterial>(
      `/materials/${updatedMaterial.id}`,
      updatedMaterial,
    );
    return response.data;
  },
);

export const deleteMaterial = createAsyncThunk(
  "materials/delete",
  async (id: number) => {
    await api.delete(`/materials/${id}`);
    return id;
  },
);

const materialSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMaterials.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        fetchMaterials.fulfilled,
        (state, action: PayloadAction<RawMaterial[]>) => {
          state.loading = false;
          state.list = action.payload;
        },
      )
      .addCase(
        addMaterial.fulfilled,
        (state, action: PayloadAction<RawMaterial>) => {
          state.list.push(action.payload);
        },
      )
      .addCase(
        editMaterial.fulfilled,
        (state, action: PayloadAction<RawMaterial>) => {
          const index = state.list.findIndex((m) => m.id === action.payload.id);
          if (index !== -1) state.list[index] = action.payload;
        },
      )
      .addCase(
        deleteMaterial.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.list = state.list.filter((m) => m.id !== action.payload);
        },
      );
  },
});

export default materialSlice.reducer;
