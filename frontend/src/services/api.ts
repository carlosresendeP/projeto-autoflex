import axios from 'axios';

// URL padrão do seu Quarkus no Docker/Dev Services
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;