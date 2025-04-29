import axios from "axios";

const API_URL = "http://localhost:8000/api/tournaments/";

export const getTournaments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    return [];
  }
};