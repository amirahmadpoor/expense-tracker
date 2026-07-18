import React, { useState } from 'react'
import NotTransaction from '../NotTransaction/NotTransaction'
import BoxTransaction from '../BoxTransaction/BoxTransaction'
import { Filter } from 'lucide-react'
import FilterCosts from '../FilterCosts/FilterCosts'

function RecentTransactions({ costs, removeCostsDB, editingCost, setEditingCost }) {

    return (
        <div className='md:col-start-2 md:col-span-3 recent-transactions bg-white w-full h-full rounded-sm pt-5 px-3 overflow-hidden'>
            <header className="recent-transactions__header flex justify-between">
                <span>تراکنش‌های اخیر</span>
                <button type="button" className="recent-transactions__filter p-2 rounded-lg bg-gray-200 cursor-pointer"
                    onClick={() => {
                        document.querySelector('.filter-box').classList.replace('hidden', 'visible');
                        document.querySelector('.overlay').classList.replace('hidden', 'visible');
                    }}
                >
                    <Filter width={20} />
                </button>
            </header>


            <div className='recent-transactions__transactions flex flex-col gap-2 mt-8 h-[400px] overflow-y-auto'>
                {costs.length > 0
                    ?
                    costs.map(cost => <BoxTransaction
                        key={cost.id}
                        {...cost}
                        removeCostsDB={removeCostsDB}
                        editingCost={editingCost}
                        setEditingCost={setEditingCost}
                    />)
                    :
                    <NotTransaction />
                }
            </div>
        </div>
    )
}

export default RecentTransactions