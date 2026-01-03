import React, {useState} from 'react';
import '../styles/sidebar.css'
import { Link } from 'react-router-dom';
import { FaThLarge, FaUsers, FaSearch, FaEdit, FaChevronUp, FaChevronDown, FaList, FaFile, FaStar, FaCommentAlt } from 'react-icons/fa';
import '../styles/admin.css'

const AdminSidebar = () => {
    const [openMenus, setOpenMenus] = useState({
        category: false,
        food: false,
        orders: false
    });

    const toggleMenu = (menu) => {
        setOpenMenus((prev) => ({...prev, [menu]:!prev[menu]}));
    }
    
    return (
        <div className = 'bg-dark text-white sidebar'>
            <div className = 'text-center p-3 border-bottom'>
                <img src = '/images/profile-logo.png' className = 'img-fluid rounded-circle mb-2' width='70' alt='admin image'/>
                <h6 className='mb-0'>Admin</h6>
            </div>

            <div className ='list-group list-group-flush'>
                <Link className = 'list-group-item list-group-item-action bg-dark text-white'><FaThLarge className = 'me-2 icon-fix'/>Dashboard</Link>
            </div>

            <div className ='list-group list-group-flush'>
                <Link className = 'list-group-item list-group-item-action bg-dark text-white'><FaUsers className = 'me-2 icon-fix'/>Registered User</Link>
            </div>

            <div className ='list-group list-group-flush'>
                <button onClick = {()=>toggleMenu('category')} className = 'list-group-item list-group-item-action bg-dark text-white '>
                <FaEdit/> Food Category {openMenus.category ? <FaChevronUp/> : <FaChevronDown/>}
                </button>
            </div>

            {openMenus.category && (
            <div className ='ps-4'>
                <Link to ='/add-category' className = 'list-group-item list-group-item-action bg-dark text-white '><FaSearch className = 'me-2 icon-fix'/>Add Category</Link>

                <Link to = '/manage-category' className = 'list-group-item list-group-item-action bg-dark text-white '><FaSearch className = 'me-2 icon-fix'/>Manage Category</Link>
            </div>
            )}

            <div className ='list-group list-group-flush'>
                <button onClick = {()=>toggleMenu('food')} className = 'list-group-item list-group-item-action bg-dark text-white '>
                <FaEdit/> Food Item {openMenus.food ? <FaChevronUp/> : <FaChevronDown/>}
                </button>
            </div>
            
            {openMenus.food && (
            <div className ='ps-4'>
                <Link  to = '/add-food' className = 'list-group-item list-group-item-action bg-dark text-white '><FaSearch className = 'me-2 icon-fix'/>Add Food Item</Link>

                <Link className = 'list-group-item list-group-item-action bg-dark text-white '><FaSearch className = 'me-2 icon-fix'/>Manage Food Item</Link>
            </div>
            )}


            <div className ='list-group list-group-flush'>
                <button onClick = {()=>toggleMenu('orders')} className = 'list-group-item list-group-item-action bg-dark text-white '>
                <FaList/> Orders {openMenus.orders ? <FaChevronUp/> : <FaChevronDown/>}
                </button>
            </div>
            
            {openMenus.orders && (
            <div className ='ps-4'>
                <Link className = 'list-group-item list-group-item-action bg-dark text-white '>Not Confirmed</Link>

                <Link className = 'list-group-item list-group-item-action bg-dark text-white '>Confirmed</Link>

                <Link className = 'list-group-item list-group-item-action bg-dark text-white '>Being Prepared</Link>

                <Link className = 'list-group-item list-group-item-action bg-dark text-white '>Food Pickup</Link>

                <Link className = 'list-group-item list-group-item-action bg-dark text-white '>Delievered</Link>

                <Link className = 'list-group-item list-group-item-action bg-dark text-white '>Cancelled</Link>

                <Link className = 'list-group-item list-group-item-action bg-dark text-white '>All Orders</Link>
            </div>
            )}


            <div className ='list-group list-group-flush'>
                <Link className = 'list-group-item list-group-item-action bg-dark text-white '><FaFile className = 'me-2 icon-fix'/>B/w Date Reports</Link>
            </div>

            <div className ='list-group list-group-flush'>
                <Link className = 'list-group-item list-group-item-action bg-dark text-white '><FaSearch className = 'me-2 icon-fix'/>Search</Link>
            </div>

            <div className ='list-group list-group-flush'>
                <Link className = 'list-group-item list-group-item-action bg-dark text-white'><FaCommentAlt className = 'me-2 icon-fix'/>Review Users</Link>
            </div>
        </div>


    )
}

export default AdminSidebar;