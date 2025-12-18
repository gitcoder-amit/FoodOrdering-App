import React, {useState, useEffect} from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import '../styles/admin.css';

const AdminLayout = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) { 
                setSidebarOpen(false);  // mobile view
            }else{
                setSidebarOpen(true);   // desktop view
            }
        }
        handleResize();  // Initial check

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount will not check in other pages

    }, []);


    const toggleSidebar = () => setSidebarOpen(prev => !prev);

    return (

       <div className = 'd-flex vh-100 w-250'> 
            { sidebarOpen && <AdminSidebar/> }
            <div className = 'flex-grow-1 d-flex flex-column'>
                <AdminHeader toggleSidebar={toggleSidebar} sidebarOpen = {sidebarOpen}/>
                <div className = 'container-fluid mt-4'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout;