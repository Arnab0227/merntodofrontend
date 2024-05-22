import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';
import Login from './components/Login';
import Signup from './components/Signup';
import Todo from './components/Todo';
import PrivateComonent from './components/PrivateComonent';
import Home from './components/Home';
import {Helmet} from 'react-helmet'

export default function App() {
    
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const auth = JSON.parse(localStorage.getItem("user"));
    const isAuthenticated = auth && auth.token;

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
    const titleHomepage = (
        <Helmet>
            <title>Todos App</title>
        </Helmet>
    )
    const titleLogin = (
        <Helmet>
            <title>Login</title>
        </Helmet>
    )
    const titleSignup = (
        <Helmet>
            <title>Signup</title>
        </Helmet>
    )
    const titleTodos = (
        <Helmet>
            <title>Todos</title>
        </Helmet>
    )
    

    return (
        
        <div className='font-nothing'>
             <Nav  handleLogout={handleLogout} username={username} navigate = {navigate} isAuthenticated={isAuthenticated}
            /> 
            <Routes>
                <Route element= {<PrivateComonent />}>
                    <Route path='/todos' element={<Todo token={token} helmet={titleTodos} />} />
                </Route>
                    <Route path='/login' element={<Login handleLogin={handleLogin} helmet={titleLogin} />} />
                    <Route path='/signup' element={<Signup handleLogin={handleLogin}  helmet={titleSignup} />} />
                    <Route path='/' element={<Home helmet={titleHomepage} navigate = {navigate} isAuthenticated={isAuthenticated} />}></Route>
                
            </Routes>
        </div>
    );
}
