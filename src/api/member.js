import axios from "axios";
const headerConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getMember = async (data) => {
  try {
    const response = await axios.post("/member", data, headerConfig);
    if (response.status) {
      return response.data;
    } else {
      throw new Error("Failed to fetch member");
    }
  } catch (error) {
    console.error("Error fetching member:", error);
    throw error;
  }
};
