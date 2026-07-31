import React, { useState } from 'react'
import { Menu, SunMoon, User } from 'lucide-react'
import { Link } from 'react-router';

const Header = ({openMenu, setOpenMenu}) => {

    const toggleDarkMode = () => {
        const theme = localStorage.getItem('theme');
        if (!theme) {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.add('light');
        }
        if (theme === 'light') {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        } else if (theme === 'dark') {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
        }
    }

    return (
        <header className='header sticky top-0 col-span-full w-full rounded-sm bg-surface px-2 py-3'>
            <div className="header-wrapper container mx-auto flex items-center justify-between w-full">
                <div className="header__right flex items-center gap-2">
                    <Menu
                        className='cursor-pointer'
                        onClick={() => {
                            setOpenMenu(!openMenu);
                        }}
                    />
                    <span>
                        <img src="/expense-tracker/logo.png" alt="" width={50} />
                    </span>
                    <h2 className='text-xl font-bold sm:block hidden'>مدیریت هزینه</h2>
                </div>
                <div className='header__left flex items-center gap-2.5'>
                    <span className='btn-header bg-surface'
                        onClick={toggleDarkMode}
                    >
                        <SunMoon />
                    </span>
                    <span className='btn-header bg-surface'>
                        <Link to={'/login'}><User /></Link>
                    </span>
                </div>
            </div>
        </header>
    )
}

export default Header