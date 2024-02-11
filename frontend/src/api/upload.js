import axios from "axios";

const apiClient = axios.create({
  baseURL: "",
  mode: "cors",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization:""
  },
});

export function uploadMusic(data) {
  return apiClient.post("/content/upload", data);
}
