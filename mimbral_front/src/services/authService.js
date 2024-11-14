import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export const login = (email, password, username) => {
  return client.post("/api/login", { email, password, username });
  
};

export const logout = () => {
  return client.post("/api/logout");
};
