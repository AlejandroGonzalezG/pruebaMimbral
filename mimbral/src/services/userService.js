import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export const register = (email, password, username) => {
  return client.post("/api/register", { email, password, username });
};

export const checkUserStatus = () => {
  return client.get("/api/user");
};