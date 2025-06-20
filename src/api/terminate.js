import axios from "axios";

const headerConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const terminate = async (data) => {
  try {
    const response = await axios.post("/terminate", data, headerConfig);
    if (response?.status) {
      return response.data;
    } else {
      throw new Error("Failed to terminate");
    }
  } catch (error) {
    console.error("Error terminating:", error);
    throw error;
  }
};

export const getInfoNotesTerminate = async () => {
  try {
    const response = await axios.get("/info-notes-terminate", headerConfig);
    if (response?.status) {
      return response.data;
    } else {
      throw new Error("Failed to fetch info notes");
    }
  } catch (error) {
    console.error("Error fetching info notes:", error);
    throw error;
  }
};
