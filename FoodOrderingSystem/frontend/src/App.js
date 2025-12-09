import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>}></Route>
        <Route path = "/admin-login" element = {<AdminLogin/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
