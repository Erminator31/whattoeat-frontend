import axios from 'axios';

const customAxios = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true // Diese Einstellung gilt dann für alle Requests über customAxios
});

export default customAxios;
