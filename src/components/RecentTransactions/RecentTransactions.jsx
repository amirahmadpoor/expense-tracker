import React, { useState } from 'react'
import NotTransaction from '../NotTransaction/NotTransaction'
import BoxTransaction from '../BoxTransaction/BoxTransaction'
import { Filter } from 'lucide-react'
// import FilterCosts from '../FilterCosts/FilterCosts'

function RecentTransactions({ costs, removeCostsDB, editingCost, setEditingCost, typeCost, categories }) {
    const [typeField, setTypeField] = useState('-1');
    const [categoryField, setCategoryField] = useState('-1');
    const [dateField, setDateField] = useState('-1');
    const [sortField, setSortField] = useState('-1');

    const sorts = ['جدیدترین', 'قدیمی‌ترین', 'بیشترین مبلغ', 'کمترین مبلغ']

    const toggleTypeField = () => {
        document.querySelector('.select-type').classList.toggle('hidden');
    }

    const toggleCategoryField = () => {
        document.querySelector('.select-category').classList.toggle('hidden');
    }

    const toggleSortField = () => {
        document.querySelector('.select-sorting').classList.toggle('hidden');
    }

    return (
        <div className='recent-transactions md:col-start-2 md:col-span-3 md:min-h-[528px] bg-white w-full h-full rounded-sm pt-5 px-3 overflow-hidden'>
            <header className="recent-transactions__header flex items-center gap-2 border-b pb-3 border-gray-300 text-sm">
                <div className="recent-transactions__search bg-gray-100 rounded-sm border p-1">
                    <input type="text"
                        className='outline-none'
                        placeholder='جستجو' />
                </div>
                <div className="recent-transactions__type max-w-[150px] w-full bg-gray-100 rounded-sm border p-1 relative">
                    <div className='outline-none cursor-pointer'
                        onClick={toggleTypeField}
                    >
                        {typeField === '-1'
                            ?
                            'همه'
                            :
                            typeField
                        }
                    </div>
                    <ul className='select-type w-full border rounded-sm p-1 absolute right-0 mt-1 bg-white z-10 hidden'>
                        <p
                            className='cursor-pointer hover:bg-gray-100 rounded-sm p-1'
                            onClick={() => {
                                setTypeField('-1')
                                toggleTypeField();
                            }}
                        >
                            همه</p>

                        {typeCost.map((type, index) => (
                            <li
                                key={index}
                                className='cursor-pointer w-full hover:bg-gray-100 rounded-sm p-1'
                                onClick={() => {
                                    setTypeField(type);
                                    toggleTypeField();
                                }}
                            >
                                {type}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="recent-transactions__category max-w-[200px] w-full bg-gray-100 rounded-sm border p-1 relative">
                    <div className='outline-none cursor-pointer'
                        onClick={toggleCategoryField}
                    >
                        {categoryField === '-1'
                            ?
                            'همه'
                            :
                            categoryField
                        }
                    </div>
                    <ul className='select-category w-full border rounded-sm p-1 absolute right-0 mt-1 bg-white z-10 hidden'>
                        <p
                            className='cursor-pointer hover:bg-gray-100 rounded-sm p-1'
                            onClick={() => {
                                setCategoryField('-1')
                                toggleCategoryField();
                            }}
                        >
                            همه</p>

                        {categories.map((category, index) => (
                            <li
                                key={index}
                                className='cursor-pointer w-full hover:bg-gray-100 rounded-sm p-1'
                                onClick={() => {
                                    setCategoryField(category);
                                    toggleCategoryField();
                                }}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* <div className="recent-transactions__date bg-gray-100 rounded-sm border p-1">
                    <div className='outline-none'>
                    </div>
                </div> */}
                <div className="recent-transactions__sorting max-w-[100px] w-full bg-gray-100 rounded-sm border p-1 cursor-pointer relative">
                    <div type="text"
                        onClick={toggleSortField}
                    >
                        {sortField === '-1'
                            ?
                            'همه'
                            :
                            sortField
                        }
                    </div>
                    <ul className='select-sorting w-full border rounded-sm p-1 absolute right-0 mt-1 bg-white z-10 hidden'>
                        <p
                            className='cursor-pointer hover:bg-gray-100 rounded-sm p-1'
                            onClick={() => {
                                setSortField('-1')
                                toggleSortField();
                            }}
                        >
                            همه</p>

                        {sorts.map((sort, index) => (
                            <li
                                key={index}
                                className='cursor-pointer w-full hover:bg-gray-100 rounded-sm p-1'
                                onClick={() => {
                                    setSortField(sort);
                                    toggleSortField();
                                }}
                            >
                                {sort}
                            </li>
                        ))}
                    </ul>
                </div>
            </header>


            <div className='recent-transactions__transactions flex flex-col gap-2 mt-5 h-[400px] overflow-y-auto'>
                <span className='font-bold'>تراکنش‌های اخیر</span>
                {costs.length > 0
                    ?
                    costs.map(cost => <BoxTransaction
                        key={cost.id}
                        {...cost}
                        removeCostsDB={removeCostsDB}
                        editingCost={editingCost}
                        setEditingCost={setEditingCost}
                    />)
                    :
                    <NotTransaction />
                }
            </div>
        </div>
    )
}

export default RecentTransactions