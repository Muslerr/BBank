import axios from "axios";
import localforage from "localforage";

const apiClient = axios.create({
  baseURL: "http://localhost:5276/api", 
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
     
        localStorage.removeItem("token");
        window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export const getCards = async () => {
  try {
    const response = await apiClient.get("/cards");
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      window.location.replace("/login");
      window.location.reload();
    }
    console.error("Error fetching cards:", error);
    throw error;
  }
};

export const getBanks = async () => {
  const queryKey = "banks";
  try {
    const cachedData = await localforage.getItem(queryKey);
    if (cachedData && Date.now() - cachedData.timestamp < 20 * 60 * 1000) {
      return cachedData.data;
    }
    const response = await apiClient.get("/banks");
    await localforage.setItem(queryKey, {
      data: response.data,
      timestamp: Date.now(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching banks:", error);
    console.error("Error details:", error.stack);
    throw error;
  }
};

export const getFilteredCards = async (filter) => {
  console.log("Filtering cards");
  try {
    
    const queryParams = new URLSearchParams(filter);
    const response = await apiClient.get(`/cards?${queryParams.toString()}`);
   
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered cards:", error);
    throw error;
  }
};

export const increaseCreditLimit = async (cardId, requestData) => {
  try {
    const response = await apiClient.put(`/cards/${cardId}`, requestData);
    return response.data;
  } catch (error) {
    console.error("Error increasing credit limit:", error);
    throw error;
  }
};

export const getOccupations = async () => {
  try {
    const response = await apiClient.get("/Occupations");
    console.log("fetched occupations");
    return response.data;
  } catch (error) {
    console.error("Error fetching Occupations:", error);
    throw error;
  }
};

export const validateToken = async () => {
  try {
    const response = await apiClient.get("/User/ValidateToken");
    return response.data.valid;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return false;
    }
    throw error;
  }
};