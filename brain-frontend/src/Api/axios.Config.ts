import axios from "axios"


const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL : API_URL,
    withCredentials : true,
    timeout : 5000,
    headers : {
        "Content-Type" : "application/json",
        Accept : "application/json"
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        // for debugging
        console.log('Request:', {
            url: config?.url,
            baseURL: config?.baseURL,
            method: config?.method,
            headers: config?.headers
          });
        const AUTH_TOKEN = localStorage.getItem("accessToken");
        if(AUTH_TOKEN){
            config.headers.Authorization = `Bearer ${AUTH_TOKEN}`
        }
        return config
    },
    (error) => {
        console.error("Request Error : ", error)
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && 
            !originalRequest._retry && 
            !originalRequest.url?.includes('/login') && 
            !originalRequest.url?.includes('/signup')){
            
            originalRequest._retry = true;
            try {
                // const response = await getRefreshToken();
                // const {AUTH_TOKEN : accessToken } = response.data;
                // originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }

)