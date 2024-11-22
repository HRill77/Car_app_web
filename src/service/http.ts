import axios from "axios";



const http = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
});


http.interceptors.response.use(
    (response) => {
      // If the response is successful, just return it
      return response;
    }, (error)=>{
        if (error.response.status === 401){
        console.log("Authentication error detected. Redirecting to login.");
        console.log("Network error detected. Redirecting to login.");
        window.location.href = `${import.meta.env.PORT}`
        return error
    }
    return Promise.reject(error);
});

export default http;