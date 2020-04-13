import ApiService from './apiService';

const HITS_PER_PAGE = 18;
const BASE_URL = 'https://hn.algolia.com/api';
const apiService = new ApiService({ baseURL: BASE_URL });

export default {
    getHackerNews: (page) => apiService.get(`/v1/search?page=${page}&hitsPerPage=${HITS_PER_PAGE}`)
}
