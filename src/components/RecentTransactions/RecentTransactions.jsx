import React, { useState } from 'react'
import NotTransaction from '../NotTransaction/NotTransaction'
import BoxTransaction from '../BoxTransaction/BoxTransaction'
import { Filter } from 'lucide-react'

function RecentTransactions({ costs, removeCost }) {
    return (
        <div className='recent-transactions bg-white w-full h-full rounded-lg pt-5 pb-5 pl-3 pr-3 overflow-hidden'>
            <header className="recent-transactions__header flex justify-between">
                <span>تراکنش‌های اخیر</span>
                <span className="recent-transactions__filter p-2 rounded-lg bg-gray-200 cursor-pointer">
                    <Filter width={20} />
                </span>
            </header>


            <div className='recent-transactions__transactions flex flex-col gap-2 mt-8 h-full overflow-y-auto'>
                {costs.length > 0
                    ?
                    costs.map(cost => <BoxTransaction key={cost.id} {...cost} removeCost={removeCost} />)
                    :
                    <NotTransaction />
                }
            </div>
        </div>
    )
}

export default RecentTransactions