import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Clear any previous error messages

        if (!email || !password) {
            setError('Please provide both email and password.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in successfully');
            navigate('/'); // Redirect to the landing page after successful login
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
            console.error('Firebase Error:', err.message);  // Log the error for better debugging
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
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
                <button type="submit" className="w-full bg-blue-500 text-white py-2">Login</button>
                <p>
                    Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
