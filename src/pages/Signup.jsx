import React, { useState } from 'react';
import loginImage from '/loginIcon.png'; // Import your image
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const res = await axios.post('http://localhost:3000/user/auth/sign-up', {
            name:name,    
            email: email,
            password: password,
            });

            if (res.data) {
                if (res.status === 200 || res.status === 409) {
                    alert(res.data.message);
                }
            }
        } catch (error) {
            console.log('Axios Error', error);
        }
    };

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-gray-300">
            <div className="w-auto md:max-w-md bg-white p-8 rounded-lg shadow-lg flex">
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-4">Signup</h2>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-semibold mb-1">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter Email..."
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block font-semibold mb-1">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter Name..."
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block font-semibold mb-1">
                                Password:
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name='password'
                                placeholder="Enter Password..."
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className="absolute top-3/4 right-4 transform -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <div className="mb-4 relative">
                            <label htmlFor="confirmPassword" className="block font-semibold mb-1">
                                Confirm Password:
                            </label>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                placeholder="Confirm Password..."
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <span
                                className="absolute top-3/4 right-4 transform -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Signup
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p>
                            Already have an account?{' '}
                            <a href="/" className="text-blue-500 hover:underline">
                                Login
                            </a>
                        </p>
                    </div>
                </div>
                <div className="hidden lg:block w-fit">
                    <img src={loginImage} alt="Signup" className="w-full h-full rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default Signup;
