import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import AddCategory from './pages/addCategory'
import ManageCategory from './pages/manageCategory'
import AddFood from './pages/addFood';
import ManageFood from './pages/manageFood';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>}></Route>
        <Route path = "/admin-login" element = {<AdminLogin/>}></Route>
        <Route path = "/admin-dashboard" element = {<AdminDashboard/>}></Route>
        <Route path = '/add-category' element = {<AddCategory/>}></Route>
        <Route path = '/manage-category' element = {<ManageCategory/>}></Route>
        <Route path = '/add-food' element = {<AddFood/>}></Route>
        <Route path = '/manage-food' element = {<ManageFood/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
