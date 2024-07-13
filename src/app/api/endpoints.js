import { API_METHODS } from "./constants";

export const PAYMENTS_APIS = {
    getPaymentsLink: {
        method: API_METHODS.POST,
        url: '/manage_api/v1/links/'
    },
    getExpenses: {
        method: API_METHODS.GET,
        url: '/expenses',
        redux: 'updateExpenses'
    }
};