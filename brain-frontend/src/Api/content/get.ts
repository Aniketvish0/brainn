import axiosInstance from "../axios.config"

export const getallcontent = async() => {
    try {
        const response = await axiosInstance.get('/content/allnodes');
        return response;
    }catch(error : any){
        console.error({
            error : error,
            message: error?.message,
            response: error?.response?.data
        });
        throw error;
    }
}