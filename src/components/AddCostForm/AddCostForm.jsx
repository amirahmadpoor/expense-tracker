import React from 'react'

function AddCostForm() {
    return (
        <div className="form bg-white w-full h-full rounded-lg pt-5 pb-5 pl-3 pr-3">
            <header className="form__header">
                <span className="form__title">افزودن تراکنش</span>
            </header>
            <form id='form' className='flex flex-col gap-2'>
                <div className="input flex flex-col gap-2">
                    <label htmlFor="description" className='font-bold'>توضیحات</label>
                    <input type="text" id='description' className='h-8 bg-gray-200 rounded-lg p-2'/>
                </div>
                <div className="input flex flex-col gap-2">
                    <label htmlFor="price" className='font-bold'>مبلغ</label>
                    <input type="number" id='price' className='h-8 bg-gray-200 rounded-lg'/>
                </div>
                <div className="input flex flex-col gap-2">
                    <label htmlFor="type" className='font-bold'>نوع</label>
                    <input type="text" id='type' className='h-8 bg-gray-200 rounded-lg p-2'/>
                </div>
                <div className="input flex flex-col gap-2">
                    <label htmlFor="category" className='font-bold'>دسته بندی</label>
                    <input type="text" id='category' className='h-8 bg-gray-200 rounded-lg p-2'/>
                </div>
                <div className="input flex flex-col gap-2">
                    <label htmlFor="date" className='font-bold'>تاریخ</label>
                    <input type="date" id='date' className='h-8 bg-gray-200 rounded-lg p-2'/>
                </div>
                <button type='button' className='bg-black text-white w-full h-8 rounded-lg mt-2'>افزودن</button>
            </form>
        </div>
    )
}

export default AddCostForm