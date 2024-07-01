import axios from 'axios';

// For common config
axios.defaults.headers.post['Content-Type'] = 'application/json';

const databaseInstance = axios.create({
  baseURL: 'http://localhost:3001/',
});

const customAxios = axios.create({
  baseURL: 'https://some-custom-domain.example/api/',
});

export { databaseInstance, customAxios };
