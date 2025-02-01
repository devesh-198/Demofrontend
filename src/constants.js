export const DEV_API_URL = "http://127.0.0.1:8000/";
export const PROD_API_URL = "https://demobackend-q62d.onrender.com";

export const API_URL = () => process.env.NODE_ENV !== 'production' ? DEV_API_URL : PROD_API_URL;
