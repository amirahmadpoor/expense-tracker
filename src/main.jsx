import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  
    <Routes>
      <Route path="/expense-tracker/*" element={<App />} />
    </Routes>

    <Toaster
      position="top-center"
      reverseOrder={false}
    />
  </BrowserRouter>,
)
