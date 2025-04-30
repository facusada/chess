import axios from "axios";

const CREATE_TOURNAMENT_URL = "http://localhost:8000/api/tournaments/create/";
const GET_TOURNAMENTS_URL = "http://localhost:8000/api/tournaments/";
const GET_TOURNAMENTS_DETAIL_URL = (tournamentId) => `http://localhost:8000/api/tournaments/${tournamentId}/full/`;
const REGISTER_TOURNAMENT_URL = (tournamentId) => `http://localhost:8000/api/tournaments/${tournamentId}/register/`;
const GENERATE_MATCHES_URL = (tournamentId) => `http://localhost:8000/api/tournaments/${tournamentId}/generate_matches/`;

export const createTournament = async (data) => {
  const token = localStorage.getItem("accessToken");

  const payload = {
    name: data?.name,
    description: data?.description,
    mode: data?.mode,
    start_date: data?.startDate,
    start_time: data?.startTime,
    max_players: data?.players,
    prize: data?.prize,
  }

  try {
    const response = await axios.post(CREATE_TOURNAMENT_URL, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating tournament:", error);
    throw error.response?.data || { detail: "Internal server error" };
  }
};

export const getTournaments = async () => {
  try {
    const response = await axios.get(GET_TOURNAMENTS_URL);
    
    return response.data;
  } catch (error) {
    console.error("Error creating tournament:", error);
    throw error.response?.data || { detail: "Internal server error" };
  }
};

export const getTournamentDetail = async (tournamentId) => {
  try {
    const response = await axios.get(GET_TOURNAMENTS_DETAIL_URL(tournamentId));

    return response.data;
  } catch (error) {
    console.error("Error getting tournament detail:", error);
    throw error.response?.data || { detail: "Internal server error" };
  }
};

export const registerToTournament = async (tournamentId) => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.post(REGISTER_TOURNAMENT_URL(tournamentId),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error registering to tournament:", error);
    throw error.response?.data || { detail: "Internal server error" };
  }
};

export const generateMatches = async (tournamentId) => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.post(GENERATE_MATCHES_URL(tournamentId),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating matches:", error);
    throw error.response?.data || { detail: "Internal server error" };
  }
};