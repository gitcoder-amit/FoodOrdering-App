import React, {useState, useEffect} from "react";
import PublicLayout from "../components/PublicLayout";
import { toast, ToastContainer, toastContainter } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const Register = () => {
        const [formData, setFormData] = useState({
            first_name :   '',
            last_name : '',
            mobile : '',
            email : '',
            password : '',
            repeatpassword: ''
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
    
                const data = new FormData()
                data.append("first_name", formData.first_name);
                data.append("last_name", formData.last_name);
                data.append("mobile", formData.mobile);
                data.append("email", formData.email);
                data.append("password", formData.password);
                data.append("repeatpassword", formData.password);
    
                try{
                const response = await fetch('http://127.0.0.1:8000/api/add-food-item/', {
                    method: 'POST',
                    body: data     
                });
        
                const result = await response.json();
        
                if (response.status == 201){
                    toast.success(result.message);
                    setFormData({
                        category :   '',
                        item_price : '',
                        item_name : '',
                        item_description : '',
                        image : null,
                        item_quantity : ''
                    })
                }
                else{
                    toast.error(result.message);
                }
                }
                catch(error){
                    console.error("Error adding category:", error);
                    toast.error("ERROR adding category. Please try again.");
                }
        
            }
    return (
        <PublicLayout>
            <div className="container py-2">
                <div className="row shadow-lg rounded-4">
                    <div className="col-md-6 p-4">
                        <h2 className="text-center mb-4">
                            <i className="fas fa-user-plus me-2"></i>User Registration</h2>
                        <form>
                            <div className = "mb-3">
                                <input  name ='first_name' className = 'form-control' value={formData.first_name}  placeholder = 'First Name' onChange={handleChange} />
                            </div>

                            <div className = "mb-3">
                                <input  name ='last_name' className = 'form-control' value={formData.last_name} placeholder = 'Last Name' onChange={handleChange} />
                            </div>

                            <div className = "mb-3">
                                <input  name ='email' className = 'form-control' value={formData.email}  placeholder = 'Email' onChange={handleChange}/>
                            </div>

                            <div className = "mb-3">
                                <input  name ='mobile' className = 'form-control' value={formData.mobile}  placeholder = 'Mobile Number' onChange={handleChange}/>
                            </div>

                            <div className = "mb-3">
                                <input  name ='password' className = 'form-control' value={formData.password} placeholder = 'Password' onChange={handleChange}/>
                            </div>

                            <div className = "mb-3">
                                <input  name ='repeatpassword' className = 'form-control' value={formData.repeatpassword}  placeholder = 'Repeat Password' onChange={handleChange}/>
                            </div>

                            <button className='btn btn-primary w-100'><i className="fas fa-user-check me-2"></i>Submit</button>
                        </form>
                    </div>

                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <div className="p-4 text-center">
                        <img src='images/admin-bg.jpeg' className="img-fluid"/>
                        <h5 className="mt-3">Register is fast, secure and free</h5>
                        <p className="text-muted small">Join our food family and enjoy delicious food delievered to your door!</p>
                    </div>
                </div>
            </div>
            </div>
        </PublicLayout>
    )
}

export default Register