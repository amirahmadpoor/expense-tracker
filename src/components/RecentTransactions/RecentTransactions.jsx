import React, { useState } from 'react'
import NotTransaction from '../NotTransaction/NotTransaction'
import BoxTransaction from '../BoxTransaction/BoxTransaction'

function RecentTransactions({
    costs,
    removeCostsDB,
    editingCost,
    setEditingCost,
    typeCost,
    categories
}) {

    const FILTER_ALL = 'all';
    const [typeField, setTypeField] = useState(FILTER_ALL);
    const [categoryField, setCategoryField] = useState(FILTER_ALL);
    const [sortField, setSortField] = useState('newest');

    const [showType, setShowType] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [showSort, setShowSort] = useState(false);

    const sorts = [
        { value: 'newest', label: 'جدیدترین' },
        { value: 'oldest', label: 'قدیمی‌ترین' },
        { value: 'highest', label: 'بیشترین مبلغ' },
        { value: 'lowest', label: 'کمترین مبلغ' },
    ];

    const closeAll = () => {
        setShowType(false);
        setShowCategory(false);
        setShowSort(false);
    };

    const toggleTypeField = () => {
        setShowType(prev => !prev);
        setShowCategory(false);
        setShowSort(false);
    };

    const toggleCategoryField = () => {
        setShowCategory(prev => !prev);
        setShowType(false);
        setShowSort(false);
    };

    const toggleSortField = () => {
        setShowSort(prev => !prev);
        setShowType(false);
        setShowCategory(false);
    };

    let costsFiltered = costs
        .filter(cost => typeField === FILTER_ALL || cost.type === typeField)
        .filter(cost => categoryField === FILTER_ALL || cost.category === categoryField);

    switch (sortField) {
        case 'highest':
            costsFiltered.sort((a, b) => Number(b.amount) - Number(a.amount));
            break;

        case 'lowest':
            costsFiltered.sort((a, b) => Number(a.amount) - Number(b.amount));
            break;

        case 'oldest':
            costsFiltered.sort((a, b) => a.date - b.date);
            break;

        case 'newest':
        default:
            costsFiltered.sort((a, b) => b.date - a.date);
            break;
    }

    return (
        <div className='recent-transactions md:col-start-2 md:col-span-3 md:min-h-[528px] bg-white w-full h-full rounded-sm pt-5 px-3 overflow-hidden'>

            <header className="recent-transactions__header flex items-center gap-2 border-b pb-3 border-gray-300 text-sm">

                <div className="recent-transactions__search bg-gray-100 rounded-sm border-field p-1">
                    <input
                        type="text"
                        className='outline-none'
                        placeholder='جستجو'
                    />
                </div>

                <div className="recent-transactions__type max-w-[150px] w-full bg-gray-100 rounded-sm border-field p-1 relative">

                    <div
                        className='cursor-pointer'
                        onClick={toggleTypeField}
                    >
                        {typeField === FILTER_ALL
                            ? 'همه تراکنش‌ها'
                            : typeCost.find(item => item.value === typeField)?.label}
                    </div>

                    <ul className={`w-full border rounded-sm p-1 absolute right-0 mt-1 bg-white z-10 ${showType ? '' : 'hidden'}`}>

                        <li
                            className='cursor-pointer hover:bg-gray-100 rounded-sm p-1'
                            onClick={() => {
                                setTypeField('all');
                                closeAll();
                            }}
                        >
                            همه تراکنش‌ها
                        </li>

                        {typeCost.map((type, index) => (
                            <li
                                key={index}
                                className='cursor-pointer hover:bg-gray-100 rounded-sm p-1'
                                onClick={() => {
                                    setTypeField(type.value);
                                    type.value === 'income' && setCategoryField(FILTER_ALL);
                                    closeAll();
                                }}
                            >
                                {type.label}
                            </li>
                        ))}

                    </ul>

                </div>

                <div className="recent-transactions__category max-w-[200px] w-full bg-gray-100 rounded-sm border-field p-1 relative">

                    <div
                        className='cursor-pointer'
                        onClick={toggleCategoryField}
                    >
                        {categoryField === FILTER_ALL
                            ? 'همه دسته‌ها'
                            : categories.find(item => item.value === categoryField)?.label}
                    </div>

                    <ul className={`w-full border rounded-sm p-1 absolute right-0 mt-1 bg-white z-10 ${showCategory ? '' : 'hidden'}`}>

                        <li
                            className='cursor-pointer hover:bg-gray-100 rounded-sm p-1'
                            onClick={() => {
                                setCategoryField('all');
                                closeAll();
                            }}
                        >
                            همه دسته‌ها
                        </li>

                        {categories.map((category, index) => (
                            <li
                                key={index}
                                className='cursor-pointer hover:bg-gray-100 rounded-sm p-1'
                                onClick={() => {
                                    setCategoryField(category.value);
                                    closeAll();
                                }}
                            >
                                {category.label}
                            </li>
                        ))}

                    </ul>

                </div>

                <div className="recent-transactions__sorting max-w-[120px] w-full bg-gray-100 rounded-sm border-field p-1 relative">

                    <div
                        className='cursor-pointer'
                        onClick={toggleSortField}
                    >
                        {sorts.find(sort => sort.value === sortField)?.label}
                    </div>

                    <ul className={`w-full border rounded-sm p-1 absolute right-0 mt-1 bg-white z-10 ${showSort ? '' : 'hidden'}`}>

                        {sorts.map(sort => (
                            <li
                                key={sort.value}
                                className='cursor-pointer hover:bg-gray-100 rounded-sm p-1'
                                onClick={() => {
                                    setSortField(sort.value);
                                    closeAll();
                                }}
                            >
                                {sort.label}
                            </li>
                        ))}

                    </ul>

                </div>

            </header>

            <div className='recent-transactions__transactions flex flex-col gap-2 mt-5 h-[400px] overflow-y-auto'>

                <span className='font-bold'>
                    تراکنش‌های اخیر
                </span>

                {costsFiltered.length > 0
                    ? costsFiltered.map(cost => (
                        <BoxTransaction
                            key={cost.id}
                            {...cost}
                            categories={categories}
                            removeCostsDB={removeCostsDB}
                            editingCost={editingCost}
                            setEditingCost={setEditingCost}
                        />
                    ))
                    : <NotTransaction />
                }

            </div>

        </div>
    );
}

export default RecentTransactions;