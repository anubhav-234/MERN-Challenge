// callApi.js

import axios from 'axios';

const BASE_URL = "http://localhost:9001/api/";

// Function to make HTTP request to an API endpoint
async function callApi(method, url, data = null, params = null, headers = null) {
    url = BASE_URL + url;
    try {
        const config = {
            method: method.toUpperCase(),
            url,
            data,
            params,
            headers
        };
        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw new Error(`Error making ${method.toUpperCase()} request to ${url}: ${error.message}`);
    }
}

export default callApi;
