import axios from "axios";

export const api = axios.create({
  baseURL: "https://directoryv2-backend.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
