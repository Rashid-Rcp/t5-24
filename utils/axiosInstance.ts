import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api', // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// });

export default axiosInstance; 