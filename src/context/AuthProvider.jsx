import React, { useState,useEffect} from 'react';
import { AuthContext } from './AuthContext'; // Import from the other file

// 1. Create the Provider component
export const AuthProvider = ({ children }) => {
    // 1. Check localStorage IMMEDIATELY when the state is created
    // This is called a "Lazy Initializer"
    const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('ls_user');
    return savedUser ? JSON.parse(savedUser) : null;
    });

    const [isAppReady, setIsAppReady] = useState(false);

    // 2. Use the effect ONLY for setting the ready flag
    useEffect(() => {
    // This 'defer' prevents the cascading render error
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 0);
    
    return () => clearTimeout(timer);
	}, []);

    /**
   * 3. GLOBAL ACTIONS
   * These functions will be accessible from ANY component in the app.
   */
    const login = (userData) => {
    setUser(userData);
    localStorage.setItem('ls_user', JSON.stringify(userData));
    };

    const logout = () => {
    setUser(null);
    localStorage.removeItem('ls_user');
	};

    return(
        // We pass the "State" and the "Actions" through the Provider tunnel
        <AuthContext.Provider  value={{ user, login, logout, isAppReady }}>
            {children}
        </AuthContext.Provider>
    );
    // By wrapping our App in the AuthProvider and passing children, 
    // we are granting every single component in our project a 
    // 'VIP Pass' to access our global user state

    

};