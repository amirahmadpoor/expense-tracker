import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import { Home } from './pages/Home'
import NotFound from './pages/NotFound'

function App() {

  const checkTheme = () => {
    const theme = localStorage.getItem('theme');
    document.documentElement.classList.add(theme);
  }

  useEffect(() => {
    checkTheme();
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App