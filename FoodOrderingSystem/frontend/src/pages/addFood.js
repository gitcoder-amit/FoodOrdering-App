import React, {useState, useEffect} from "react";
import AdminLayout from "../components/AdminLayout";
import { toast, ToastContainer, toastContainter } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const AddFood = () => {
    // const [categoryName, setCategoryName] = useState('')
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({
        category :   '',
        item_price : '',
        item_name : '',
        item_description : '',
        image : null,
        item_quantity : ''
    })
    

    
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/categories')
        .then(res=>res.json())
        .then(data => {
            setCategories(data)
        })
    }, []) 


    const handleChange = (e) => {
        const {name, value} = e.target;
        
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))  // prev values will be in prev variable
    };


    const handleFileChange = (e) => {
        setFormData((prev)=>({
            ...prev,
            image:e.target.files[0]
        }));  // prev values will be in prev variable
    }
    
    const handleSubmit = async (e) => {
            e.preventDefault();

            try{
            const response = await fetch('http://127.0.0.1:8000/api/add-category/', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category_name: '',
                })
            });
    
            const data = await response.json();
    
            if (response.status == 201){
                toast.success(data.message);
            }
            else{
                toast.error("Something went wrong.....");
            }
            }
            catch(error){
                console.error("Error adding category:", error);
                toast.error("ERROR adding category. Please try again.");
            }
    
        }
        
    return (
        <AdminLayout>
            <div className = 'row'>
                <div className = 'col-md-8'>
                    <div className = 'p-4 shadow-sm rounded'>
                        <h4  className = 'mb-4'>
                            <i className = 'fa fa-plus-circle text-primary me-2'></i> Add Food Item
                        </h4>

                        <form onSubmit = {handleSubmit} encType="multipart/form-data" method = "post">  
                            <div className = "mb-3">
                                <label className = "form-label">
                                    Food Category</label>
                                    <select name='category' className = 'form-select' value={formData.category} onChange = {handleChange} required>
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                                    ))}
                                    </select>
                            </div>

                            <div className = "mb-3">
                                <label className = "form-label">
                                    Food Item Name</label>
                                <input type='text' name ='item_name' className = 'form-control' value={formData.item_name} onChange = {handleChange} placeholder = 'Enter Food Item Name' required/>
                            </div>

                            <div className = "mb-3">
                                <label className = "form-label">
                                    Description</label>
                                <textarea  name ='item_description' className = 'form-control' value={formData.item_description} onChange = {handleChange} placeholder = 'Enter Description' required/>
                            </div>


                            <div className = "mb-3">
                                <label className = "form-label">
                                 Price (₹)</label>
                                <input type='number' name ='item_price' step = '.01' className = 'form-control' value={formData.item_price}  onChange = {handleChange} placeholder = 'Enter Price' required/>
                            </div>


                            <div className = "mb-3">
                                <label className = "form-label">
                                   Quantity</label>
                                <input type='text' name ='item_quantity' className = 'form-control' value={formData.item_quantity} onChange = {handleChange} placeholder = 'Enter Quantity' required/>
                            </div>


                            <div className = "mb-3">
                                <label className = "form-label">
                                    Image</label>
                                <input type='file' accept='image/*' name ='image' className = 'form-control'  onChange = {handleFileChange} placeholder = 'Enter Availabity' required/>
                            </div>
        
                            <button type = "submit" className = "btn btn-primary mt-2">Submit</button>
                        </form>
                    </div>
                </div>
                <div className = 'col-md-4 d-flex justify-content-center align-items-center'>
                    <i className = 'fas fa-pizza-slice' style = {{fontSize : '180px', color: '#e5e5e5'}}></i>
                </div>
                <ToastContainer position="top-center" autoClose = {2000} />

            </div>
        </AdminLayout>
    )
    
}

export default AddFood