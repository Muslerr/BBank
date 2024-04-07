import axios from "axios";
import localforage from "localforage";

const apiClient = axios.create({
  baseURL: "http://localhost:5275/api", // Replace with your API base URL
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

export const getCards = async () => {
  try {
    const response = await apiClient.get("/cards");
    return response.data;
  } catch (error) {
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
    await localforage.setItem(
      queryKey,
      { data: response.data, timestamp: Date.now() },
      20 * 60
    ); // Cache for 20 minutes
    return response.data;
  } catch (error) {
    console.error("Error fetching banks:", error);
    throw error;
  }
};

export const getFilteredCards = async (filter) => {
  try {
    console.log("Loading cards");
    const response = await apiClient.post("/cards", filter);
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered cards:", error);
    throw error;
  }
};
