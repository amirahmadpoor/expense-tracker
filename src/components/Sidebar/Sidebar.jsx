import { Home, LayoutGrid, Settings, Ticket, Wallet } from 'lucide-react'
import React from 'react'

const Sidebar = ({ openMenu, setOpenMenu }) => {
    const ItemMenu = ({ icon: Icon, title }) => {
        return (
            <li
                className="item p-4 hover:bg-surface-2 transition-colors duration-300 rounded-sm flex items-center gap-2 cursor-pointer"
                onClick={() => setOpenMenu(false)}
            >
                <Icon width={20} height={20} />
                <span className='item__title'>{title}</span>
            </li>)
    }
    return (
        <aside className={`sidebar sm:sticky fixed top-0 bg-surface max-w-[250px] w-full h-dvh ${openMenu ? '' : 'close'} transition-all duration-200 shadow-lg z-11 sm:z-0`}>

            <ul className="sidebar__items flex flex-col gap-1 p-2">

                <ItemMenu icon={Home} title='خانه' />
                <ItemMenu icon={Ticket} title='تراکنش‌ها' />
                <ItemMenu icon={Wallet} title='بودجه' />
                <ItemMenu icon={LayoutGrid} title='دسته‌ها' />
                <ItemMenu icon={Settings} title='تنظیمات' />

            </ul>

        </aside>
    )
}

export default Sidebar