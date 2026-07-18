// import { format } from 'date-fns-jalali';
import { Edit3, Trash, TrendingDown, TrendingUp } from 'lucide-react'
import Swal from 'sweetalert2'

function BoxTransaction({ id, title, amount, type, category, date, removeCostsDB, editingCost, setEditingCost }) {

    return (
        <div className={`box flex justify-between items-center border-b p-3 border-border`}>
            <div className="box__right flex items-center gap-2">
                {type === 'هزینه'
                    ?
                    <span className="box__type p-4 rounded-full bg-danger-light text-danger">
                        <TrendingDown />
                    </span>
                    :
                    <span className="box__type p-4 rounded-full bg-success-light text-success">
                        <TrendingUp />
                    </span>
                }
                <div className="box__info w-[200px]">
                    <span className='font-bold'>
                        {title}
                    </span>
                    <div className='text-gray-400 flex gap-2'>
                        {category && <span>{category} - </span>}
                        <span>{new Date(date).toLocaleDateString("fa-IR")}</span>
                    </div>
                </div>
            </div>

            <div className="box__center">
                <span className={`box__amount 
                    ${type === 'هزینه'
                        ?
                        'text-red-600'
                        :
                        'text-green-500'
                    }
                    `}>
                    {Number(amount).toLocaleString("fa-IR")} تومان
                </span>
            </div>

            <div className="box__left flex items-center gap-4">

                <button type="button" className="box__edit text-primary cursor-pointer"
                    onClick={() => {
                        setEditingCost({ id, title, amount, type, category, date });
                        
                    }}
                >
                    <Edit3 width={20} />
                </button>

                <button type="button" className="box__trash text-red-600 cursor-pointer"
                    onClick={async () => {
                        const res = await Swal.fire({
                            title: 'حذف',
                            text: 'آیا از حذف تراکنش اطمینان دارید؟',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'تایید',
                            cancelButtonText: 'لغو'
                        }
                        )
                        if (res.isConfirmed) {
                            removeCostsDB(id);
                        }
                    }}
                >
                    <Trash width={20} />
                </button>
            </div>

        </div>
    )
}

export default BoxTransaction