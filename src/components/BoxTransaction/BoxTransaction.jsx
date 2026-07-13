import { Trash, TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'

function BoxTransaction({ desc, price, type, category, date}) {
    return (
        <div className='box flex justify-between bg-gray-100 p-3 rounded-lg'>
            <div className="box__right flex items-center gap-2">
                {type === 'هزینه'
                    ?
                    <span className="box__type p-4 rounded-full bg-red-200 text-red-600">
                        <TrendingDown />
                    </span>
                    :
                    <span className="box__type p-4 rounded-full bg-green-200 text-green-600">
                        <TrendingUp />
                    </span>
                }
                <div className="box__inf">
                    <span className='font-bold'>
                        {desc}
                    </span>
                    <div className='text-gray-400 flex gap-2'>
                        <span>{category}</span>
                        -
                        <span>{date}</span>
                    </div>
                </div>
            </div>
            <div className="box__left flex items-center gap-2">
                <span className={`box__price 
                    ${type === 'هزینه'
                        ?
                        'text-red-600'
                        :
                        'text-green-500'
                    }
                    `}>
                    {Number(price).toLocaleString("fa-IR")} تومان
                </span>
                <span className="box__trash text-red-600">
                    <Trash width={20} />
                </span>
            </div>
        </div>
    )
}

export default BoxTransaction