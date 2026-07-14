import React, { useState } from 'react'
import RecentTransactions from '../RecentTransactions/RecentTransactions';

function AddCostForm({ costs, setCosts, addCostsDB }) {
    const today = new Date().toISOString().split("T")[0];
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(today);
    const [openType, setOpenType] = useState(false);
    const [openCategories, setOpenCategories] = useState(false);
    const [selectType, setSelectType] = useState('');
    const typeCost = [
        'هزینه', 'درآمد'
    ]
    const categories = [
        'غذا', 'حمل و نقل', ' قبض', 'سرگرمی', 'خرید', 'بهداشت', 'آموزش', 'سایر'
    ]

    const resetForm = () => {
        setDesc('');
        setPrice('');
        setType('');
        setCategory('');
        setDate(today);
        setOpenType(false);
        setOpenCategories(false);
        setSelectType('');
    }

    const handleAddCost = () => {
        const newCost = {
            desc,
            price,
            type,
            category,
            date
        }
        addCostsDB(newCost);
    }


    return (
        <div className="form bg-white w-full h-full rounded-lg pt-5 pb-5 pl-3 pr-3">
            <header className="form__header">
                <span className="form__title">افزودن تراکنش</span>
            </header>
            <form id='form' className='flex flex-col gap-2'
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAddCost();
                }}
            >
                <div className="input flex flex-col gap-2">
                    <label htmlFor="description" className='font-bold'>توضیحات</label>
                    <input
                        type="text"
                        id='description'
                        required
                        value={desc}
                        className='h-10 bg-gray-200 rounded-lg p-2 outline-0 focus:border'
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <div className="input flex flex-col gap-2">
                    <label htmlFor="price" className='font-bold'>مبلغ</label>
                    <input
                        type="number"
                        id='price'
                        required
                        value={price}
                        className='h-10 bg-gray-200 rounded-lg p-2 outline-0 focus:border'
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="input flex flex-col gap-2 relative">
                    <label htmlFor="type" className='font-bold'>نوع</label>
                    <input
                        id='type'
                        readOnly
                        value={type}
                        className='h-10 bg-gray-200 rounded-lg p-2 outline-0 focus:border'
                        value={type}
                        onClick={() => {
                            setOpenType(!openType);
                            setOpenCategories(false);
                        }}
                    />
                    {openType &&
                        <ul className='border rounded-lg p-1 absolute -bottom-25 bg-white w-full z-10'>
                            {typeCost.map(type =>
                                <li
                                    key={type}
                                    className={`h-10 flex items-center  rounded-lg p-1 cursor-pointer
                                        ${selectType === type ? 'bg-gray-200' : 'hover:bg-gray-200'}
                                        `}
                                    onClick={() => {
                                        setType(type);
                                        setOpenType(false);
                                        setSelectType(type);
                                    }}
                                >
                                    {type}
                                </li>)}
                        </ul>
                    }
                </div>
                {type === 'هزینه'
                    ?
                    <div className="input flex flex-col gap-2 relative">
                        <label htmlFor="category" className='font-bold'>دسته بندی</label>
                        <input
                            id='category'
                            readOnly
                            className='h-10 bg-gray-200 rounded-lg p-2 outline-0 focus:border'
                            value={category}
                            onClick={() => {
                                setOpenCategories(!openCategories);
                                setOpenType(false);
                            }}
                        />
                        {openCategories &&
                            <ul className='border rounded-lg p-1 absolute bottom-12 bg-white w-full z-10'>
                                {categories.map(category =>
                                    <li
                                        key={category}
                                        className={`h-10 flex items-center  rounded-lg p-1 cursor-pointer
                                        ${selectType === category ? 'bg-gray-200' : 'hover:bg-gray-200'}
                                        `}
                                        onClick={() => {
                                            setCategory(category);
                                            setOpenCategories(false);
                                        }}
                                    >
                                        {category}
                                    </li>)}
                            </ul>
                        }
                    </div>
                    :
                    ''
                }
                <div className="input flex flex-col gap-2">
                    <label htmlFor="date" className='font-bold'>تاریخ</label>
                    <input
                        type="date"
                        id='date'
                        value={date}
                        className='h-10 bg-gray-200 rounded-lg p-2 outline-0 focus:border'
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <button type='submit' className='bg-blue-600 text-white w-full h-10 rounded-lg mt-2 cursor-pointer'
                >افزودن</button>
            </form >
        </div >
    )
}

export default AddCostForm