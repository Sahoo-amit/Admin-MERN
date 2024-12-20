import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TokenContextProvider } from './context/TokenContext.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <TokenContextProvider>
    <StrictMode>
      <App />
      <ToastContainer />
    </StrictMode>
  </TokenContextProvider>
  ,
)
