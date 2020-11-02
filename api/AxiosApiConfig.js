import axios from 'axios';

const instance = axios.create({
    // Dev
    // baseURL: 'http://localhost:9000/api',
    // Prod
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    baseURL: 'http://3.35.190.11/api',
    timeout: 10000
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default instance;