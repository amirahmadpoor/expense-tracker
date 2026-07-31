import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'

const UserLayout = () => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <>
            <div className='w-full sm:flex'>
                <Sidebar
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                />
                <div className='content-wrapper w-full'>
                    <Header
                        openMenu={openMenu}
                        setOpenMenu={setOpenMenu}
                    />
                    <div
                        className={`overlay fixed inset-0 bg-black opacity-60 sm:hidden ${openMenu ? 'block' : 'hidden'} z-10`}
                        onClick={() => {
                            setOpenMenu(false);
                        }}
                    ></div>

                    <Outlet />

                </div>
            </div>
        </>
    )
}

export default UserLayout