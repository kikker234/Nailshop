import 'dotenv/config';
import axios from 'axios';

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.common['Instance'] = process.env.API_KEY;