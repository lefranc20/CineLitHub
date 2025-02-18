import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Ajuste para a URL do seu backend

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
