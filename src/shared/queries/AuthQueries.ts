import { useMutation } from '@tanstack/react-query';
import AuthService, { User } from '../../service/AuthService';



// Define a custom hook for the login mutation
export const useLogin = () => {
    return useMutation(async (user: User) => {
        const response = await AuthService.login(user);
        const jwtToken = response.headers.authorization;
        const token = response.data.token;
        const role =  response.data.role
        if (jwtToken) {
            sessionStorage.setItem("jwt", jwtToken);
            sessionStorage.setItem("token", token); // Store the JWT token
            sessionStorage.setItem("role", role); // Store the user role
        }
        return jwtToken; // Or you can return anything useful from the response
    });
};
