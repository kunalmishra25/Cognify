const API_BASE_URL = import.meta.env.DEV 
    ? 'http://localhost:5000/api' 
    : 'https://cognify-v5za.onrender.com/api';

export default API_BASE_URL;
