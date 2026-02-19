import React, { useState } from 'react';
import "../../App.css";

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('student'); // default
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const signupData = { username, fullName, email, password, role };

        try {
            const response = await fetch("http://localhost:8080/api/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupData),
            });

            if (!response.ok) {
                const msg = await response.text();
                setError(msg);
                return;
            }

            alert(`Account Created Successfully! Role: ${role}`);
            setUsername('');
            setFullName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setRole('student');

        } catch (err) {
            console.error(err);
            setError('Server error. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Sign Up</h2>

                {error && <p className="error-message">{error}</p>}

                {/* Role Selection */}
                <div className="role-selector-group">
                    <label>Select Role:</label>
                    <div className="role-selection">
                        <label>
                            <input
                                type="radio"
                                value="student"
                                checked={role === 'student'}
                                onChange={() => setRole('student')}
                            /> Student
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="faculty"
                                checked={role === 'faculty'}
                                onChange={() => setRole('faculty')}
                            /> Faculty
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="login-button">Create Account</button>

                <div className="create-account-link">
                    <a href="/login">Already have an account? Login</a>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
