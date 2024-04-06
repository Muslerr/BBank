import axios from 'axios';


const apiClient = axios.create({
  baseURL: 'http://localhost:5275/api', // Replace with your API base URL
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getCards = async () => {
    
    try {
    const response = await apiClient.get('/cards');
    return response.data;
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
};

export const getBanks = async () => {
    
    try {
    const response = await apiClient.get('/banks');
    return response.data;
  } catch (error) {
    console.error('Error fetching banks:', error);
    throw error;
  }
};