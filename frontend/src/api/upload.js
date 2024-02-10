import axios from 'axios'

const apiClient = axios.create({
  baseURL: ``,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export function uploadMusic(data) {
  return apiClient.post('/content', data);
}