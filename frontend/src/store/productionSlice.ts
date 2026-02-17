import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ProductionSuggestion } from '../types';
import api from '../services/api';

interface ProductionState {
  suggestions: ProductionSuggestion[];
  loading: boolean;
}

const initialState: ProductionState = {
  suggestions: [],
  loading: false,
};

export const fetchSuggestions = createAsyncThunk('production/fetchSuggestions', async () => {
    try{
        const response = await api.get<ProductionSuggestion[]>('/production/suggestion');
        return response.data;
    }catch( err){
        console.error("Erro ao buscar sugestões:", err);
        throw err;
    }
  
    
});

const productionSlice = createSlice({
  name: 'production',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => { state.loading = true; })
      
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        console.log("Dados recebidos da API:", action.payload);
        state.loading = false;
        state.suggestions = Array.isArray(action.payload) ? action.payload : [];
      });
  },
});

export default productionSlice.reducer;