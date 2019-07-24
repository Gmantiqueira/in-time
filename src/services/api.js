import axios from "axios";

var apiUrl;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    apiUrl = 'http://localhost:3000'
} else {
    apiUrl = 'https://in-time-api.herokuapp.com'
}

const api = axios.create({
    baseURL: apiUrl
});

export default api;
