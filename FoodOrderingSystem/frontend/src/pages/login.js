import React, {useState, useEffect} from "react";
import PublicLayout from "../components/PublicLayout";
import { toast, ToastContainer, toastContainter } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const Login = () => {
        const [formData, setFormData] = useState({
            emailcontact: '',
            password : '',
            })

        const navigate = useNavigate()
    
    
        const handleChange = (e) => {
            const {name, value} = e.target;
            
            setFormData((prev)=>({
                ...prev,
                [name]:value
            }))  // prev values will be in prev variable
        };
    
    
        
        const handleSubmit = async (e) => {
                e.preventDefault();

                const {emailcontact, password} = formData
                        try{
                        const response = await fetch('http://127.0.0.1:8000/api/login/', {
                            method: 'POST',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                emailcontact, password
                            })
                        });
                
                        const result = await response.json();
                
                        if (response.status == 200){
                            toast.success(result.message || 'Login Successful');
                            localStorage.setItem('userId', result.userId)
                            localStorage.setItem('userName', result.userName)
                            setFormData({
                                emailcontact : '',
                                password : '',
                            })
                            setTimeout(()=>{
                                navigate('/')
                            }, 2000)
                            
                        }
                        else{
                            toast.error(result.message || 'something went wrong');
                        }
                        }
                        catch(error){
                            console.error("Error adding category:", error);
                            toast.error("ERROR adding category. Please try again.");
                        }
                
            }
    return (
        <PublicLayout>
            <ToastContainer position="top-center" autoClose = {2000} />
            <div className="container py-2">
                <div className="row align-items-center">
                    <div className="col-md-6 p-4">
                        <h2 className="text-center mb-4">
                            <i className="fas fa-user-plus me-2"></i>User Login</h2>
                        <form className="card p-4 shadow" onSubmit={handleSubmit}>
                            <div className = "mb-3">
                                <input  name ='emailcontact' className = 'form-control' value={formData.email}  placeholder = 'Email' onChange={handleChange}/>
                            </div>


                            <div className = "mb-3">
                                <input  name ='password' className = 'form-control' value={formData.password} placeholder = 'Password' onChange={handleChange}/>
                            </div>

                            <div className="d-flex justify-content-between">
                                <button className='btn btn-primary'><i className="fas fa-user-check me-2"></i>Login</button>
                                <button className='btn btn-outline-secondary' onClick={()=>navigate('/register')}><i className="fas fa-user-check me-2"></i>Register</button>
                            </div>

                        </form>
                    </div>

                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <div className="p-4 text-center">
                        <img src='images/admin-bg.jpeg' className="img-fluid rounded-3"/>
                        <h5 className="mt-3">Login is fast, secure and free</h5>
                        <p className="text-muted small">Join our food family and enjoy delicious food delievered to your door!</p>
                    </div>
                </div>
            </div>
            </div>
        </PublicLayout>
    )
}

export default Login