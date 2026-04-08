import axios from 'axios';

// Mengambil BASE_URL dari environment variables.
// Pastikan ada file .env atau .env.local dengan VITE_API_BASE_URL=http://localhost:3001/api
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan Authorization header ke setiap request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Mengambil token dari localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Anda bisa menambahkan interceptor response di sini untuk penanganan error global,
// seperti redirect ke halaman login jika token expired (status 401).

export default axiosInstance;