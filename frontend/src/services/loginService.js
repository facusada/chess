import axios from "axios";

const API_URL = "http://localhost:8000/api/token/";

export const loginUser = async ({ username, password }) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw new Error("Invalid credentials");
    } else {
      throw new Error("Network error");
    }
  }
};