import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import the hook

function Login({ isOpen, onClose }) {
  // 1. Create state for inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 1. New Loading State
  const navigate = useNavigate();
  if (!isOpen) return null; // If not open, don't render anything

    const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    setIsLoading(true); // 2. Start loading
    // Simulate an API call to your Node.js backend
    setTimeout(() => {
    console.log("Logging in with:", { username, password });
    // This is where we will eventually call our MERN API!
    setIsLoading(false); // 3. Stop loading
    onClose(); 
    navigate('/dashboard'); // 2. This changes the URL to /dashboard
    }, 5000); // 2-second delay
  };


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login to LiveSphere</h2>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username"
        value={username} // 2. Link value to state
        onChange={(e) => setUsername(e.target.value)} // 3. Update state on type
        disabled={isLoading} // Disable input while loading
        required
        />
        <input type="password" placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading} // Disable input while loading
        required
        />
        <div className="modal-actions">
          <button type="submit" className="get-started-btn"
          disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : "Login"}
            </button>
          <button onClick={onClose} className="close-btn" disabled={isLoading}>Close</button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default Login;