import React, { useState } from 'react';
import Login from './Login';

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
    <nav className="navbar">
      <div className="logo">LiveSphere</div>
      <ul className="nav-links">
        <li>Home</li>
        <li>Network</li>
        <li onClick={() => setIsModalOpen(true)} className="login-btn">
          Login
        </li>
      </ul>
    </nav>
    {/* We pass the state and the closer function as PROPS */}
    <Login isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  </>
  );
}

export default Navbar;