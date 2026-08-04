import { Edit2 } from 'lucide-react'
import React, { useState } from 'react'

const CategoryRow = ({ title, textColor, bgColor, icon, budget, cost }) => {

    const calcPercentage = () => {
        return ((budget - cost) / budget) * 100;
    }

    const percentage = calcPercentage();

    return (
        <div className='flex items-center justify-between bg-surface py-5 px-4 border border-border rounded-sm'>
            <div className='max-w-[150px] w-full flex items-center gap-5'>
                <div className={`p-2 rounded-sm ${textColor} ${bgColor}`}>
                    {icon}
                </div>
                <div className={`${textColor}`}>{title}</div>
            </div>

            <div className={textColor}>
                {budget ? '------------' : '-'}
            </div>

            <div>{budget ? `${Number(budget).toLocaleString('fa')} تومان` : '-'} </div>
            <div
                className={`
                    ${percentage >= 70 ? 'text-success'
                        : percentage > 0 ? 'text-warning'
                            : 'text-danger'
                    }`}>
                {budget ? `${Number(budget - cost).toLocaleString('fa')} تومان` : '-'}
            </div>

            {budget ?
                <div
                    className={`center-content px-2 py-1 text-sm 
                        ${percentage >= 70 ? 'text-success bg-success-light'
                            : percentage > 0 ? 'text-warning bg-warning-light'
                                : 'text-danger bg-danger-light'
                        }
                 rounded-sm border border-border`}>
                    {
                        percentage >= 70 ? 'عادی'
                            : percentage > 0 ? 'در حال اتمام'
                                : 'تمام شده'
                    }
                </div>
                : '-'
            }

            {budget ?
                <div className='border border-border rounded-sm p-2 cursor-pointer'>
                    <Edit2 width={18} height={18} />
                </div>
                :
                <div className='p-2 bg-primary-light text-primary rounded-sm border border-primary cursor-pointer'>تعیین بودجه</div>
            }
        </div>
    )
}

export default CategoryRow