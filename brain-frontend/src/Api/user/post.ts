import axiosInstance from "../axios.config";
interface Signupdata {
    fullname : string
    username: string, 
    email: string,
    password : string
}
export const signupUser = async(data : Signupdata) => {
    try{
        const response = axiosInstance.post('/user/signup', data);
        console.log(response);
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

export const loginUser = async(usernameOrEmail: string , password : string) => {
    try {
        const response = axiosInstance.post("/user/login",{
            usernameOrEmail,
            password
        });
        console.log(response);
        return response;
    } catch (error : any) {
        console.error({
            error : error,
            message: error?.message,
            response: error?.response?.data
        });
        throw error;
    }
}