import axiosInstance from '../axios.config';
import { AxiosResponse } from 'axios';

export interface ContentData {
    type: string;
    url?: string;
    tags: string[];
    title: string;
    content?: string;
}

export const getAllContent = async () => {
    try {
        const response = await axiosInstance.get('/content/allnodes');
        return response;
    } catch (error: any) {
        console.error({
            error: error,
            message: error?.message,
            response: error?.response?.data
        });
        throw error;
    }
};

export const addContent = async (data: ContentData) => {
    try {
        const response: AxiosResponse = await axiosInstance.post('/content/create', data);
        return response;
    } catch (error: any) {
        console.error({
            error: error,
            message: error?.message,
            response: error?.response?.data
        });
        throw error;
    }
}; 