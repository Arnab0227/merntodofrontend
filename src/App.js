import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';
import Login from './components/Login';
import Signup from './components/Signup';
import Todo from './components/Todo';
import PrivateComonent from './components/PrivateComonent';
import Home from './components/Home';

export default function App() {
    
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
          setToken(userData.token);
          setUsername(userData.username);
        }
      }, []);

    const handleLogin = (token, username) => {
        console.log("Login Response:", token, username);
        setToken(token);
        setUsername(username);
        
    };
    
    
    const handleLogout = () => {
       
        localStorage.clear()
        setToken('');
        navigate('/');
    };

    return (
        
        <div className='font-nothing'>
             <Nav  handleLogout={handleLogout} username={username}
            /> 
            <Routes>
                <Route element= {<PrivateComonent />}>
                    <Route path='/todos' element={<Todo token={token} />} />
                </Route>
                    <Route path='/login' element={<Login handleLogin={handleLogin} />} />
                    <Route path='/signup' element={<Signup handleLogin={handleLogin}  />} />
                    <Route path='/' element={<Home />}></Route>
                
            </Routes>
        </div>
    );
}
