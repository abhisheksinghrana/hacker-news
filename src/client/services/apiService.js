import axios from 'axios';

const BASE_URL = process.env.URL || 'http://localhost:3000/';
const API_TIMEOUT = 10000;
const HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

class ApiService {
    constructor({ baseURL = BASE_URL, timeout = API_TIMEOUT, headers = HEADERS, auth }) {
        const client = axios.create({
            baseURL,
            timeout,
            headers,
            auth,
        });

        client.interceptors.response.use(this.handleSuccess, this.handleError);
        this.client = client;
    }

    handleSuccess(response) {
        return response;
    }

    handleError(error) {
        return Promise.reject(error);
    }

    get(path) {
        return this.client.get(path).then(response => response.data);
    }

    post(path, payload) {
        return this.client.post(path, payload).then(response => response.data);
    }
}

export default ApiService;