import axios from "axios";

// Verifica se a API está rodando localmente, senão cai no deploy de produção
const API_URL = 
  window.location.hostname === 'localhost' 
    ? "http://localhost:5000/api/filmes" 
    : "https://cinelithub-production.up.railway.app/api/filmes";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
