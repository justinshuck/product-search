import axios from 'axios';
import config from './../../config/default.json';

export function getMatches(keyword) {
    return axios.get(`${config.productServiceURL}/productSearch?keyword=${keyword}&fullResponse=true`)
}
