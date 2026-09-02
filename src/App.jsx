import { useEffect, useRef, useState } from 'react'
import './App.css'
import router from './route'
import { RouterProvider } from 'react-router';

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
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App