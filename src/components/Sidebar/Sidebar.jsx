import { Edit2, Home, LayoutGrid, Settings, Ticket, User, Wallet } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router'

const Sidebar = ({ openMenu, setOpenMenu }) => {
    const [selectItem, setSelectItem] = useState('home');

    const subMenus = [
        { value: 'home', title: 'خانه' },
        { value: 'transactions', title: 'تراکنش‌ها' },
        { value: 'budget', title: 'بودجه' },
        { value: 'category', title: 'دسته‌ها' },
        { value: 'setting', title: 'تنظیمات' },
    ]

    const checkSelect = () => {
        return subMenus.find(subMenu => subMenu.value === selectItem);
    }

    const ItemMenu = ({ icon: Icon, title, value }) => {
        return (
            <div
                className={`item p-4 ${selectItem === value && 'bg-primary text-white'} ${selectItem !== value && 'hover:bg-surface-2'} transition-colors duration-300 rounded-sm flex items-center gap-2 cursor-pointer`}
                onClick={() => {
                    setOpenMenu(false);
                    setSelectItem(value);
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

                <Link to='/'>
                    <ItemMenu icon={Home} title='خانه' value='home' />
                </Link>

                <ItemMenu icon={Ticket} title='تراکنش‌ها' value='transactions' />

                <Link to='/budgeting'>
                    <ItemMenu icon={Wallet} title='بودجه' value='budget' />
                </Link>

                <ItemMenu icon={LayoutGrid} title='دسته‌ها' value='category' />
                <ItemMenu icon={Settings} title='تنظیمات' value='setting' />

            </ul>

        </aside>
    )
}

export default Sidebar