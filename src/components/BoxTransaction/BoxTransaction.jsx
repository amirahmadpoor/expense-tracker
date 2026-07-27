// import { format } from 'date-fns-jalali';
import { Edit3, Trash, TrendingDown, TrendingUp } from 'lucide-react'
import Swal from 'sweetalert2'

function BoxTransaction({ id, title, amount, type, category, date, categories, removeCostsDB, editingCost, setEditingCost }) {
    const categoryLabel = {
        food: 'غذا',
        transport: 'حمل و نقل',
        bill: 'قبض',
        entertainment: 'سرگرمی',
        shopping: 'خرید',
        health: 'بهداشت',
        education: 'آموزش',
        other: 'سایر',
    }[category];

    return (
        <div className='box flex items-center justify-between gap-5 border-b p-3 border-border max-md:text-sm'>
            <div className="box__right flex items-center gap-2">
                {type === 'expense'
                    ?
                    <span className="box__type md:p-4 p-2 md:text-sm rounded-full bg-danger-light text-danger">
                        <TrendingDown className='w-[20px] h-[20px] md:w-[25px] md:h-[25px]' />
                    </span>
                    :
                    <span className="box__type md:p-4 p-2 md:text-sm rounded-full bg-success-light text-success">
                        <TrendingUp className='w-[20px] h-[20px] md:w-[25px] md:h-[25px]' />
                    </span>
                }
                <div className="box__info">
                    <span className='font-bold'>
                        {title}
                    </span>
                    <div className='text-gray-400 flex gap-2'>
                        {categoryLabel && (
                            <span>
                                {categoryLabel} -
                            </span>
                        )}
                        <span>{date.toLocaleDateString("fa-IR")}</span>
                    </div>
                </div>
            </div>

            <div className='sm:max-w-[200px] md:max-w-[250px] xl:max-w-[400px] w-full md:text-sm xl:text-body flex items-end justify-between gap-2 flex-col-reverse sm:flex-row'>
                <div className="box__center">
                    <span className={`box__amount 
                    ${type === 'expense'
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
                        <Edit3 className='w-[15px] md:w-[20px]' />
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
                        <Trash className='w-[15px] md:w-[20px]' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BoxTransaction