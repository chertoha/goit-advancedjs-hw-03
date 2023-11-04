import axios from 'axios';

export const ROUTES = {
  BREEDS: '/breeds',
  SEARCH: '/images/search',
};

axios.defaults.headers.common['x-api-key'] =
  'live_TXJqDJeRS9JivKq3zq7sv4yzdOKp1ER7wIZK3ZAVZcB7rVqgE85DUoqQnpfQg9LB';

export const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
});
