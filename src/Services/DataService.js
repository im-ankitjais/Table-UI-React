import axios from "axios";
const DOMAIN_API = "https://api.coingecko.com"
export class DataService {
    async getData(currency,page,perPage) {
        const API_URL = `${DOMAIN_API}/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    }
}