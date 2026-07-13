import React, { useState } from 'react'
import NotTransaction from '../NotTransaction/NotTransaction'
import BoxTransaction from '../BoxTransaction/BoxTransaction'

function RecentTransactions({ costs, removeCost }) {
    return (
        <div className='recent-transactions bg-white w-full h-full rounded-lg pt-5 pb-5 pl-3 pr-3'>
            <header className="recent-transactions__header">تراکنش‌های اخیر</header>

            <div className='recent-transactions__transactions flex flex-col gap-2 mt-8'>
                {costs.length > 0
                    ?
                    costs.map(cost => <BoxTransaction key={cost.id} {...cost} removeCost={removeCost}/>)
                    :
                    <NotTransaction/>
                }
            </div>
        </div>
    )
}

export default RecentTransactions