import React, { useEffect, useState } from 'react'
import RecentTransactions from '../RecentTransactions/RecentTransactions';
import DatePickerModule from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import moment from 'jalali-moment';


function AddCostForm({ typeCost, categories, costs, setCosts, addCostsDB, editingCost, setEditingCost, editCostsDB }) {

    const DatePicker = DatePickerModule.default;
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date());
    const [openType, setOpenType] = useState(false);
    const [openCategories, setOpenCategories] = useState(false);
    const [selectType, setSelectType] = useState('');

    const isValid = title.trim() && amount.trim() && type.trim();

    const resetForm = () => {
        setTitle('');
        setAmount('');
        setType('');
        setCategory('');
        setDate(today);
        setOpenType(false);
        setOpenCategories(false);
        setSelectType('');
    }

    const handleAddCost = () => {
        const newCost = {
            title,
            amount,
            type,
            category,
            date
        }
        console.log(date);

        addCostsDB(newCost);
        resetForm();
    }

    const handleEditCost = () => {
        const editCost = {
            id: editingCost.id,
            title,
            amount,
            type,
            category,
            date
        }
        editCostsDB(editCost);
        resetForm();
        setEditingCost(null);
    }

    useEffect(() => {
        if (editingCost) {
            setTitle(editingCost.title);
            setAmount(editingCost.amount);
            setType(editingCost.type);
            setCategory(editingCost.category);
            setDate(editingCost.date);
        }
    }, [editingCost]);


    return (
        <div className="form md:max-h-[528px] md:col-span-1 bg-white w-full rounded-sm pt-5 pb-5 pl-3 pr-3">
            <header className="form__header">
                <span className="form__title font-bold">افزودن تراکنش</span>
            </header>
            <form id='form' className='flex flex-col gap-2 mt-8'
                onSubmit={(e) => {
                    e.preventDefault();
                    !editingCost ? handleAddCost() : handleEditCost();
                }}
            >
                <div className="input flex flex-col gap-2">
                    <label htmlFor="title" className='font-bold'>عنوان</label>
                    <input
                        type="text"
                        id='title'
                        required
                        value={title}
                        className='h-10 bg-gray-100 rounded-sm p-2 outline-0 focus:border'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="input flex flex-col gap-2">
                    <label htmlFor="amount" className='font-bold'>مبلغ</label>
                    <input
                        type="number"
                        id='amount'
                        required
                        value={amount}
                        className='h-10 bg-gray-100 rounded-sm p-2 outline-0 focus:border'
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="input flex flex-col gap-2 relative">
                    <label htmlFor="type" className='font-bold'>نوع</label>
                    <input
                        id='type'
                        readOnly
                        value={type}
                        className='h-10 bg-gray-100 rounded-sm p-2 outline-0 focus:border'
                        onClick={() => {
                            setOpenType(!openType);
                            setOpenCategories(false);
                        }}
                    />
                    {openType &&
                        <ul className='border rounded-sm p-1 absolute -bottom-25 bg-white w-full z-10'>
                            {typeCost.map(type =>
                                <li
                                    key={type}
                                    className={`h-10 flex items-center  rounded-sm p-1 cursor-pointer
                                        ${selectType === type ? 'bg-gray-100' : 'hover:bg-gray-100'}
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
                            className='h-10 bg-gray-100 rounded-sm p-2 outline-0 focus:border'
                            value={category}
                            onClick={() => {
                                setOpenCategories(!openCategories);
                                setOpenType(false);
                            }}
                        />
                        {openCategories &&
                            <ul className='border rounded-sm p-1 absolute bottom-12 bg-white w-full z-10'>
                                {categories.map(category =>
                                    <li
                                        key={category}
                                        className={`h-10 flex items-center  rounded-sm p-1 cursor-pointer
                                        ${selectType === category ? 'bg-gray-100' : 'hover:bg-gray-100'}
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
                    <label className='font-bold'>تاریخ</label>
                    <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        value={date}
                        onChange={(value) => {
                            setDate(value.toDate())
                        }}
                    />

                </div>
                <button
                    type='submit'
                    disabled={!isValid}
                    className={`btn-submit ${isValid ? 'bg-primary cursor-pointer' : 'bg-gray-300 cursor-not-allowed'} text-white w-full h-10 rounded-sm mt-2`}
                >{!editingCost ? 'افزودن' : 'ویرایش'}</button>
            </form >
        </div >
    )
}

export default AddCostForm