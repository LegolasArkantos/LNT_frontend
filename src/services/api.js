import axios from "axios"

export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:4000/api",
});

export const apiPrivate = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:4000/api", 
    headers:{'Content-Type': 'application/json'},
    withCredentials: true
});

