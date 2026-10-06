import React, { useState } from 'react'
import { Outlet, useMatches } from 'react-router'
import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import PageTitle from '../components/PageTitle/PageTitle'

const UserLayout = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    // const matches = useMatches();

    return (
        <>
            <div className='w-full sm:flex'>
                <div id="overlay" className={`fixed inset-0 bg-black opacity-75 z-1 ${!showOverlay && 'invisible'}`}></div>
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

                    <PageTitle />

                    {/* {
                        matches.filter(match =>
                            match.handle?.breadcrumb
                        )
                            .map((match, index) =>
                                <li key={index}>
                                    {match.handle.breadcrumb(match)}
                                </li>
                            )
                    } */}

                    <Outlet
                        context={{
                            showOverlay,
                            setShowOverlay
                        }}
                    />

                </div>
            </div>
        </>
    )
}

export default UserLayout