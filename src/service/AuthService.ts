import axios from "axios";
import { jwtDecode } from "jwt-decode";

export type User = {
    username: string;
    password: string;
};

class AuthService {
    login(user: User) {
        return axios.post(`${import.meta.env.VITE_API_URL }login`, user);
    }

     // Function to check if token is expired
     isTokenExpired(token: string): boolean {
        if (!token) return true; // Token is not present
        const decoded: any = jwtDecode(token); // Decode the token
        const exp = decoded.exp * 1000; // Convert to milliseconds
        return Date.now() > exp; // Check if current time is greater than expiration time
    }

}

export default new AuthService();
