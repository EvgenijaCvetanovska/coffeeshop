import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import data from "./data-store";

const mock: MockAdapter = new MockAdapter(axios);

// Mocking a GET request
mock.onGet('/api/coffee-types').reply(200, data.coffeeTypes);

// Exporting axios instance
const mockedAxiosInstance: AxiosInstance = axios;
export default {
    getCoffeeTypes: async () => {
        try {
            const response = await mockedAxiosInstance.get("/api/coffee-types");
            if (response.status == 200) {
                return response.data;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }
};