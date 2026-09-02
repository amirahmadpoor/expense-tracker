import { Edit2, Home, LayoutGrid, LogOut, Settings, Ticket, User, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { getProfileController } from '../../controllers/profile.controller';

const Sidebar = ({ openMenu, setOpenMenu }) => {
    const activeTab = useLocation();
    const [nameUser, setNameUser] = useState('');

    const subMenus = [
        { id: 1, value: '/', title: 'خانه', icon: Home },
        { id: 2, value: '/transactions', title: 'تراکنش‌ها', icon: Ticket },
        { id: 3, value: '/budget', title: 'بودجه', icon: Wallet },
        { id: 4, value: '/category', title: 'دسته‌ها', icon: LayoutGrid },
        { id: 5, value: '/setting', title: 'تنظیمات', icon: Settings },
    ];

    const ItemMenu = ({ icon: Icon, title, value }) => {
        return (
            <Link
                to={value}
                className={`item p-4 ${activeTab.pathname === value && 'bg-primary text-white'} ${activeTab.pathname !== value && 'hover:bg-surface-2'} transition-colors duration-300 rounded-sm flex items-center gap-2 cursor-pointer`}
                onClick={() => {
                    setOpenMenu(false);
                }}
            >
                <Icon width={20} height={20} />
                <span className='item__title'>{title}</span>
            </Link>
        )
    }

    useEffect(() => {
        const getName = async () => {
            const response = await getProfileController();

            if (response) {
                setNameUser(response.name);
            }
        }

        getName();
    }, []);

    return (
        <aside className={`sidebar sm:sticky fixed top-0 bg-surface max-w-[250px] w-full h-dvh ${openMenu ? '' : 'close'} transition-all duration-200 shadow-lg z-11 sm:z-0`}>

            <div className="sidebar__account flex items-center justify-between p-2 h-30 border-b border-b-surface-3">
                <div className='flex items-center gap-2'>
                    <div className="sidebar__image-user bg-surface-3 p-4 rounded-full">
                        <User />
                    </div>
                    <div className="sidebar__info-user flex flex-col text-sm text-text-secondary">
                        <span className="name-user">{nameUser}</span>
                        <span className="email-user">amir@gmail.com</span>
                    </div>
                </div>

                <button>
                    <LogOut className='text-danger scale-x-[-1]' />
                </button>
            </div>

            <ul className="sidebar__items flex flex-col gap-1 p-2">

                {subMenus.map(subMenu =>
                    <ItemMenu key={subMenu.id} {...subMenu} />
                )}

            </ul>

        </aside>
    )
}

export default Sidebar