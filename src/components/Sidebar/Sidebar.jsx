import { Edit2, Home, LayoutGrid, Settings, Ticket, User, Wallet } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router'

const Sidebar = ({ openMenu, setOpenMenu }) => {
    const activeTab = useLocation();

    const subMenus = [
        { id: 1, value: '/', title: 'خانه', icon: Home },
        { id: 2, value: '/transactions', title: 'تراکنش‌ها', icon: Ticket },
        { id: 3, value: '/budget', title: 'بودجه', icon: Wallet },
        { id: 4, value: '/category', title: 'دسته‌ها', icon: LayoutGrid },
        { id: 5, value: '/setting', title: 'تنظیمات', icon: Settings },
    ]

    const checkSelect = () => {
        return subMenus.find(subMenu => subMenu.value === selectItem);
    }

    const ItemMenu = ({ icon: Icon, title, value }) => {
        return (
            <div
                className={`item p-4 ${activeTab.pathname === value && 'bg-primary text-white'} ${activeTab.pathname !== value && 'hover:bg-surface-2'} transition-colors duration-300 rounded-sm flex items-center gap-2 cursor-pointer`}
                onClick={() => {
                    setOpenMenu(false);
                }}
            >
                <Icon width={20} height={20} />
                <span className='item__title'>{title}</span>
            </div>
        )
    }

    return (
        <aside className={`sidebar sm:sticky fixed top-0 bg-surface max-w-[250px] w-full h-dvh ${openMenu ? '' : 'close'} transition-all duration-200 shadow-lg z-11 sm:z-0`}>

            <div className="sidebar__account flex items-center gap-2 p-2 h-30 border-b border-b-surface-3">
                <div className="sidebar__image-user bg-surface-3 p-4 rounded-full">
                    <User />
                </div>
                <div className="sidebar__info-user flex flex-col text-sm text-text-secondary">
                    <span className="name-user">امیر</span>
                    <span className="email-user">amir@gmail.com</span>
                </div>
            </div>

            <ul className="sidebar__items flex flex-col gap-1 p-2">

                {subMenus.map(subMenu =>
                    <Link key={subMenu.id} to={subMenu.value}>
                        <ItemMenu {...subMenu} />
                    </Link>
                )}

            </ul>

        </aside>
    )
}

export default Sidebar