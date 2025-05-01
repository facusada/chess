import axios from "axios";

const API_URL = "http://localhost:8000/api/register/";

export const registerUser = async ({ username, email, password }) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.detail || "Error registering user");
    } else {
      throw new Error("Network error");
    }
  }
};