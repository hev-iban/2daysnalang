import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}register/`, userData, {
            headers: { 'Content-Type': 'application/json' },
        });
        
        console.log('User registered successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration Error:', error.response?.data || error.message);
        throw error.response?.data || { error: 'Registration failed. Please try again.' };
    }
};

// Login User
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}login/`, userData, {
            headers: { 'Content-Type': 'application/json' },
        });

        const { token, user } = response.data;
        if (token) {
            localStorage.setItem('token', token); // Store token securely
            localStorage.setItem('user', JSON.stringify(user)); // Store user details
        }

        console.log('Login successful:', user);
        return response.data;
    } catch (error) {
        console.error('Login Error:', error.response?.data || error.message);
        throw error.response?.data || { error: 'Login failed. Please check your credentials.' };
    }
};

// Logout User
export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('User logged out.');
};
