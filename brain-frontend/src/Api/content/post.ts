import axiosInstance from "../axios.config"
import { AxiosResponse } from "axios";
interface addcontetdata {
    type : string,
    url?: string,
    tags : string[],
    title : string,
    content? : string
}
export const addContent = async(data:addcontetdata) => {
    try {
        const response : AxiosResponse = await axiosInstance.post('/content/create',data);
        console.log(response);
        return response;
    } catch(error : any){
        console.error({
            error : error,
            message: error?.message,
            response: error?.response?.data
        });
        throw error;
    }
}