import axios from "axios";

export const getRefreshToken = () => {
    try {
        const response = axios.get('/user/refreshtoken');
        return response;
    } catch (error : any) {
        throw error
    } 
};
