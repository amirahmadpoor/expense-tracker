import { TransactionsContext } from '../../pages/Home';
import { useContext, useEffect, useState } from 'react'
import RecentTransactions from '../RecentTransactions/RecentTransactions';
import DatePickerModule from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { getTransactionsController, insertTransactionController, updateTransactionController } from '../../controllers/transactions.controller';
import Loading from '../Loading/Loading';

function AddCostForm() {
    const { typeCost, categories, setTransactions, editingTransaction, setEditingTransaction } = useContext(TransactionsContext);

    const DatePicker = DatePickerModule.default;
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date());
    const [openType, setOpenType] = useState(false);
    const [openCategories, setOpenCategories] = useState(false);
    const [selectType, setSelectType] = useState('');
    const [selectCategory, setSelectCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const isValid = title.trim() && amount.trim() && type.trim();

    const resetForm = () => {
        setTitle('');
        setAmount('');
        setType('');
        setCategory('');
        setDate(new Date());
        setOpenType(false);
        setOpenCategories(false);
        setSelectType('');
    }

    const handleAddCost = async () => {
        setLoading(true);

        try {
            const newCost = {
                title,
                amount,
                type,
                category,
                date
            }

            await insertTransactionController(newCost);
            await setTransactions(await getTransactionsController());
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            resetForm();
        }
    }

    const handleEditCost = async () => {
        setLoading(true);
        try {
            const editCost = {
                title,
                amount,
                type,
                category,
                date
            }

            await updateTransactionController(editingTransaction.id, editCost);
            await setTransactions(await getTransactionsController());
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            resetForm();
            setEditingTransaction(null);
        }
    }

    useEffect(() => {
        if (editingTransaction) {
            setTitle(editingTransaction.title);
            setAmount(editingTransaction.amount);
            setType(editingTransaction.type);
            setCategory(editingTransaction.category);
            setDate(new Date(editingTransaction.date));
        }
    }, [editingTransaction]);


    return (
        <div className="form card md:max-h-[550px] w-full bg-surface rounded-sm pt-5 pb-5 pl-3 pr-3">
            <header className="form__header">
                <span className="form__title font-bold">افزودن تراکنش</span>
            </header>
            <form id='form' className='flex flex-col gap-2 mt-8'
                onSubmit={(e) => {
                    e.preventDefault();
                    !editingTransaction ? handleAddCost() : handleEditCost();
                }}
            >
                <div className="input flex flex-col gap-2">
                    <label htmlFor="title" className='font-bold'>عنوان</label>

                    <div className='border-field overflow-hidden p-2'>
                        <input
                            type="text"
                            id='title'
                            required
                            value={title}
                            className='w-100 h-10 outline-0'
                            placeholder='عنوان تراکنش'
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div className="input flex flex-col gap-2">
                    <label htmlFor="amount" className='font-bold'>مبلغ</label>

                    <div className='border-field'>
                        <input
                            type="number"
                            id='amount'
                            required
                            value={amount}
                            className='w-100 h-10 p-2 outline-0'
                            placeholder='مبلغ'
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                </div>
                <div className="input flex flex-col gap-2 relative">
                    <label htmlFor="type" className='font-bold'>نوع</label>

                    <div className='border-field'>
                        <input
                            id='type'
                            readOnly
                            value={typeCost.find(item => item.value === type)?.label || ''}
                            className='w-100 h-10 p-2 outline-0'
                            placeholder='انتخاب تراکنش'
                            onClick={() => {
                                setOpenType(!openType);
                                setOpenCategories(false);
                            }}
                        />
                    </div>

                    {openType &&
                        <ul className='border-field p-1 absolute -bottom-25 bg-surface w-full z-10'>
                            {typeCost.map(type =>
                                <li
                                    key={type.value}
                                    className={`h-10 flex items-center rounded-sm p-1 cursor-pointer 
                                        ${selectType === type.value && 'bg-surface-3'}`}
                                    onClick={() => {
                                        setType(type.value);
                                        setOpenType(false);
                                        setSelectType(type.value);
                                    }}
                                >
                                    {type.label}
                                </li>)}
                        </ul>
                    }
                </div>
                {type === 'expense'
                    ?
                    <div className="input flex flex-col gap-2 relative">
                        <label htmlFor="category" className='font-bold'>دسته بندی</label>


                        <div className='border-field'>
                            <input
                                id='category'
                                readOnly
                                className='h-10 p-2 outline-0'
                                placeholder='انتخاب دسته'
                                value={categories.find(item => item.value === category)?.label || ''}
                                onClick={() => {
                                    setOpenCategories(!openCategories);
                                    setOpenType(false);
                                }}
                            />
                        </div>

                        {openCategories &&
                            <ul className='border-field p-1 absolute bottom-12 bg-surface w-full z-10'>
                                {categories.map(category =>
                                    <li
                                        key={category.value}
                                        className={`h-10 flex items-center rounded-sm p-1 cursor-pointer
                                            ${category === category.value && 'bg-surface-3'}`}
                                        onClick={() => {
                                            setCategory(category.value);
                                            setOpenCategories(false);
                                        }}
                                    >
                                        {category.label}
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
                        inputClass='custom-date-picker'
                        calendar={persian}
                        locale={persian_fa}
                        value={date}
                        onChange={(value) => {
                            setDate(value.toDate())
                        }}
                    />

                </div>

                <button
                    type="submit"
                    disabled={!isValid || loading}
                    className={`btn-submit ${isValid && !loading
                        ? 'bg-primary cursor-pointer'
                        : 'bg-surface-3 cursor-not-allowed'
                        } text-white font-bold w-full h-10 rounded-sm mt-2 flex items-center justify-center gap-2`}
                >
                    {loading ? (
                        <>
                            <Loading className="w-5 h-5" />
                            <span>{editingTransaction ? 'در حال ویرایش...' : 'در حال افزودن...'}</span>
                        </>
                    ) : (
                        editingTransaction ? 'ویرایش' : 'افزودن'
                    )}
                </button>
            </form >
        </div >
    )
}

export default AddCostForm