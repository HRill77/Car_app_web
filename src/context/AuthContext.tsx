import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService, { User } from '../service/AuthService';
import { jwtDecode } from 'jwt-decode';


type AuthContextType = {
    user: User | null;
    login: (user: User) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem("jwt");
    //     if (token && AuthService.isTokenExpired(token)) {
    //         // Token is expired
    //         console.log("expired1")
    //         localStorage.clear();
    //         navigate("/"); // Redirect to Login Page
    //     } else if (token) {
    //         // Token is valid, retrieve user info if necessary
    //         // Decode the token to get user info or keep it in state
    //         console.log("valid")
    //         const decoded: any = jwtDecode(token);
    //         setUser(decoded.username ); // Adjust based on your token structure
    //     } else {
    //         console.log("expired2")
    //         navigate("/"); // Redirect to Login Page
    //     }
    // }, [navigate]);

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem("jwt");
            if (token && AuthService.isTokenExpired(token)) {
                // Token is expired
                console.log("expired1");
                localStorage.clear();
                navigate("/"); // Redirect to Login Page
            } else if (token) {
                // Token is valid, retrieve user info if necessary
                console.log("valid");
                const decoded : any = jwtDecode(token);
                setUser(decoded.username); // Adjust based on your token structure
            } else {
                console.log("expired2");
                navigate("/"); // Redirect to Login Page
            }
        };

        // Check token immediately on mount
        checkToken();

        // Set interval to check token every 10 seconds
        // const intervalId = setInterval(checkToken, 86400000);

        // Cleanup function to clear interval on unmount
        // return () => clearInterval(intervalId);
    }, [setUser, navigate]); // Add navigate to the dependencies if it's a prop



    const login = async (userData: User) => {
        try {
            const response = await AuthService.login(userData);
            const jwtToken = response.headers.authorization;
            const token = response.data.token;
            const role =  response.data.role
            localStorage.setItem("jwt", jwtToken);
            localStorage.setItem("token", token); 
            localStorage.setItem("role", role); 
            setUser(userData); // Set user state
            console.log("going to carlist") // Redirect to home on successful login
        } catch (error : any) {
            console.error("Login failed", error);
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/"); // Redirect to login on unauthorized
            }
            throw error; // Optionally re-throw the error for further handling
        }
    };

    const logout = () => {
        console.log("Logging out..."); 
        localStorage.clear()
        navigate("/");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
