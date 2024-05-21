import React, { useState } from 'react'
import axios from 'axios'
import { Url } from './Url'
import { useNavigate } from 'react-router-dom'

export default function Signup({ handleLogin }) {
    const [formData, setFormData] = useState({username: '', password: ''})
    const [error, setError] = useState('')
    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormData(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${Url}/sign-up`, formData);
            const { token, username } = response.data;
            handleLogin(token, username);
            navigate('/todos');
            const userData = { token, username };
            localStorage.setItem("user", JSON.stringify(userData));

            console.log("Stored Token:", token);
        } catch (error) {
            console.log('signup error', error);
            setError(error.response.data || error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className='text-2xl font-semibold mb-10 '>Welcome, Sign Up Here.</div>
            <form onSubmit={handleSubmit} className='w-1/3 border-2 rounded-2xl flex flex-col justify-center items-center p-5'>
                <input className='w-full px-5 pt-8 border-b-2 rounded-lg mb-5 focus:outline-none' type="text" name='username' placeholder="Username" value={formData.username} onChange={handleChange} />
                <input className='w-full px-5 pt-8 border-b-2 rounded-lg mb-5 focus:outline-none' type="password" name='password' placeholder="Password" value={formData.password} onChange={handleChange} />
                {error && <div className="text-red-500 mb-2">{error}</div>} {/* Display error message */}
                <button className='w-28 h-10 bg-black text-white rounded-lg mt-5' type="submit">Sign Up</button>
            </form>
        </div>
    );
}
