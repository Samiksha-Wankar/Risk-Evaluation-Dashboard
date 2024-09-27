import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error messages

        if (!email || !password) {
            setError('Please provide both email and password.');
            return;
        }

        try {
            // Create a new user with email and password
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User registered successfully');
            // Redirect to login page after successful registration
            navigate('/login');
        } catch (err) {
            setError('Failed to register. Please check your credentials.');
            console.error('Firebase Error:', err.message); // Log the error for better debugging
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                {error && <p className="text-red-600">{error}</p>}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 p-2 w-full border text-black"
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4 p-2 w-full border text-black"
                    placeholder="Password"
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2">Register</button>

                <p>
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>
            </form>

        </div>
    );
};

export default Register;
