import React from 'react'
import NotTransaction from '../NotTransaction/NotTransaction'

function RecentTransactions() {
    return (
        <div className='recent-transactions bg-white w-full h-full rounded-lg pt-5 pb-5 pl-3 pr-3'>
            <header className="recent-transactions__header">تراکنش‌های اخیر</header>

            <div className='recent-transactions__transactions'>
                <NotTransaction />
            </div>
        </div>
    )
}

export default RecentTransactions