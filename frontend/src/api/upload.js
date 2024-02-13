import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/",
  mode: "cors",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.miJGqRO1oHnRY5NQq_Oo3uTU9mzZ9-aedSstOQkMF1U",
  },
});

export function uploadMusic(data) {
  console.log("axios", data);
  return apiClient.post("/content/upload", data);
}
export function loadMusic(data) {
  console.log("axios", data);
  return apiClient.get("/content/load/"+data);
}