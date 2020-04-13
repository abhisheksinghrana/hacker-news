import ApiService from './apiService';

const QUERY_STRING = '?page=';
const BASE_URL = 'https://hn.algolia.com/api';
const apiService = new ApiService({ baseURL: BASE_URL });

export default {
    getHackerNews: (page) => apiService.get(`/v1/search${QUERY_STRING}${page}`)
}
