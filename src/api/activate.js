import axios from "axios";

const headerConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const activateLeave = async (data) => {
  try {
    const response = await axios.post("/activate-leave", data, headerConfig);
    if (response?.status) {
      return response.data;
    } else {
      throw new Error("Failed to activate leave");
    }
  } catch (error) {
    console.error("Error activating leave:", error);
    throw error;
  }
};

export const getInfoNotesActivate = async () => {
  try {
    const response = await axios.get("/info-notes-activate", headerConfig);
    if (response?.status) {
      return response.data;
    } else {
      throw new Error("Failed to fetch info notes activate");
    }
  } catch (error) {
    console.error("Error fetching info notes activate:", error);
    throw error;
  }
};
