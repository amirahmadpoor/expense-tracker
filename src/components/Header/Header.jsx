import React from 'react'
import { SunMoon, User } from 'lucide-react'
import { Link } from 'react-router';

export const Header = () => {
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
        <header className='header col-span-full w-full rounded-sm bg-surface px-2 py-3'>
            <div className="header-wrapper container mx-auto flex items-center justify-between w-full">
                <div className="header__right flex items-center gap-2">
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
                        <Link to={'/expense-tracker/login/'}><User /></Link>
                    </span>
                </div>
            </div>
        </header>
    )
}
