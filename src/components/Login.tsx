import { Button, Snackbar, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Carlist from './Carlist';
import { useLogin } from '../shared/queries/AuthQueries';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type User = {
    username: string;
    password: string;
}
const Login = () => {
    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    })
    const [open, setOpen] = useState(false);
    const [isAutheticated, setAuth] = useState(false);
    const loginMutation = useLogin();
    const { login } = useAuth();
    const navigate =useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        if (token) {
            setAuth(true);  // Automatically log in if token exists
            // navigate("/calist");
        }
    }, []);



    const handeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }
    // const handleLogout= () =>{
    //     setAuth(false);
    //     sessionStorage.setItem("jwt","");
    // }

    console.log(user)
    // const handleLogin = () => {
    //     loginMutation.mutate(user, {
    //         onSuccess: () => {
          
    //             setAuth(true);  // Set authentication state if successful
    //             navigate("/carlist");
    //         },
    //         onError: (error: any) => {
    //             console.error("Login failed", error);
    //             setOpen(true);
    //         }
    //     });
    // }

    const handleLogin = async () => {
        try {
            await login(user); // Call the login function from context
            navigate("/admin");
        } catch (error) {
            console.error("Login failed", error);
            setOpen(true);
        }
    };

    // const handleLogin = async () => {
    //     try {
    //         await login(user);
    //         navigate("/carlist");
    //     } catch (error) {
    //         console.error("Login failed", error);
    //         setOpen(true);
    //     }
    // };
    // if (isAutheticated) {
    //     return <Carlist logout={handleLogout}></Carlist>
    // } else {
    //     return (
    //         <div>
    //             <Stack spacing={2} alignItems={"center"} mt={4}>
    //                 <TextField name="username" label="Username" onChange={handeChange} />
    //                 <TextField name="password" label="Password" onChange={handeChange} />
    //                 <Button variant='outlined' color='primary' onClick={handleLogin}>Login</Button>
    //             </Stack>
    //             <Snackbar open={open}
    //             autoHideDuration={3000}
    //             onClose={() =>setOpen(false)}
    //             message="Login failed: Check your username and password" 
    //             />
    //         </div>
    //     )
    // }

    return (
                <div>
                    <Stack spacing={2} alignItems={"center"} mt={4}>
                        <TextField name="username" label="Username" onChange={handeChange} />
                        <TextField name="password" label="Password" onChange={handeChange} />
                        <Button variant='outlined' color='primary' onClick={handleLogin}>Login</Button>
                    </Stack>
                    <Snackbar open={open}
                    autoHideDuration={3000}
                    onClose={() =>setOpen(false)}
                    message="Login failed: Check your username and password" 
                    />
                </div>
            )
    // return null;
}

export default Login