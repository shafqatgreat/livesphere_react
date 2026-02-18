import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// 1. Import the Provider
import { AuthProvider } from './context/AuthProvider'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Wrap App with AuthProvider */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)