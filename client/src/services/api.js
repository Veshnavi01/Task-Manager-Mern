import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-mern-y7yf.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

export const deleteCompletedTasks = async () => {
  const res = await API.delete("/tasks/completed");
  return res.data;
};