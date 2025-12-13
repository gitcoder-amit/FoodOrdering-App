import React, { useState } from "react";
import {FaUser, FaLock, FaSignInAlt} from 'react-icons/fa';
import { Form } from "react-router-dom";
import '../styles/admin.css'
import { toast, ToastContainer, toastContainter } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/api/admin-login/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if (response.status == 200){
            toast.success(data.message);
            setTimeout(()=> {
                window.location.href = '/admin-dashboard';
            }, 2000)
        }
        else{
            toast.error(data.message);
        }

    }

    return (
        <div className = 'd-flex justify-content-center align-items-center vh-100' style = {{backgroundImage: "url('/images/admin-bg.jpeg')", backgroundSize:'cover'}}>
            <div className = "card shadow-lg p-4" style = {{maxWidth:'400px',width:'100%'}}>
                <h4 className = 'text-center mb-4'>
                <FaUser className = "me-2 icon-fix"/> Login
                </h4>

                <form onSubmit = {handleLogin} method = "post">
                    <div className = "mb-3">
                        <label className = "form-label"><FaUser className = "me-2 icon-fix"/>Username</label>
                        <input type='text' className = 'form-control' value={username} onChange = {(e) => setUsername(e.target.value)} placeholder = 'Enter Admin Username' required/>
                    </div>
                    <div className = "mb-3">
                        <label className = "form-label"><FaLock className = "me-2 icon-fix"/>Password</label>
                        <input type='password' className = 'form-control' value={password} onChange = {(e) => setPassword(e.target.value)} placeholder = 'Enter Admin Password' required/>
                    </div>

                    <button type = "submit" className = "btn btn-primary  w-100 mt-3"><FaSignInAlt className = 'me-2'/>Login</button>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose = {2000} />
        </div>
    )
}

export default AdminLogin;