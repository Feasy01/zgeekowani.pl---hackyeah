import axios from "axios";

const etherscanApiKey = import.meta.env.ETHERSCAN_API_KEY ? import.meta.env.ETHERSCAN_API_KEY : null

const backendUrl = import.meta.env.VITE_BACKEND_URL
  ? import.meta.env.VITE_BACKEND_URL
  : "http://localhost:8000";
const api = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getWalletTransactions(walletAddress) {
    try {
      const response = await axios.get(
        `https://api.etherscan.io/api`,
        {
          params: {
            module: "account",
            action: "txlist",
            address: walletAddress,
            startblock: 0, 
            endblock: 99999999,
            sort: "asc", 
            apikey: etherscanApiKey,
          },
        }
      );
  
      return response.data; 
    } catch (error) {
      console.error("Error fetching wallet transactions:", error);
      throw error;
    }
  }