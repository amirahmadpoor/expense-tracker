import { Edit2 } from 'lucide-react'
import React from 'react'

const CategoryRow = ({ title, textColor, bgColor, icon, budget, remainder, statusBudget }) => {
    return (
        <div className='flex items-center justify-between bg-surface py-5 px-4 border border-border rounded-sm'>
            <div className='flex items-center gap-5'>
                <div className={`p-2 rounded-sm ${textColor} ${bgColor}`}>
                    {icon}
                </div>
                <div className={`${textColor}`}>{title}</div>
            </div>

            <div className={textColor}>------------</div>
            <div>{Number(budget).toLocaleString('fa')}</div>
            <div>{Number(remainder).toLocaleString('fa')}</div>
            <div className='center-content px-2 py-1 bg-success-light text-success rounded-sm border border-border'>{statusBudget}</div>
            <div><Edit2 width={18} height={18}/></div>
        </div>
    )
}

export default CategoryRow