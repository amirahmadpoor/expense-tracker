import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import UserLayout from './Layouts/UserLayout'
import AuthLayout from './Layouts/AuthLayout'

function App() {

  const checkTheme = () => {
    const theme = localStorage.getItem('theme');
    if (!theme) return;
    document.documentElement.classList.add(theme);
  }

  useEffect(() => {
    checkTheme();
  }, []);

  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path='/' element={<Home />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>

      <Route path='/*' element={<NotFound />} />
    </Routes>
  )
}

export default App