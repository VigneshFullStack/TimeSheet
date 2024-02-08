import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { toast } from 'react-toastify';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        toast.dismiss();
        // Check if username or password is empty
        if (!username) {
            // Display toast message for empty credentials
            toast.error("Please fill the username", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        if(!password) {
            toast.error("Please fill the password", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
    
        console.log(
            `Login successful..! 
                Username : ${username} 
                Password : ${password}`
        );
    
        if (username === "admin" && password === "admin@123") {
            // Navigate to the dashboard
            navigate("/dashboard");
        } else {
            // Display toast notification for wrong credentials
            toast.error("Wrong Credentials..!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-box">
                    <h2 className="title">Login</h2>
                    <form action="#">
                        <div className="input-box">
                            <input
                                type="text"
                                autoComplete="off"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label>Username</label>
                        </div>
                        <div className="input-box">
                            <input
                                autoComplete="off"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label>Password</label>
                        </div>
                        <button type="submit" className="login-btn" onClick={handleLogin}>
                            Login
                        </button>
                    </form>
                </div>
                {/* Placeholder spans for the animation */}
                {[...Array(50)].map((_, i) => (
                    <span key={i} style={{ "--i": i }}></span>
                ))}
            </div>
        </div>
    );
};

export default Login;
