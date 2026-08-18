import { Banknote, Book, Calendar, Car, Filter, Gamepad, Hamburger, Hospital, LayoutGrid, MoreHorizontal, NotebookTabs, Plus, Receipt, SortAsc, SortDesc, TrendingDown, Wallet, WalletMinimal } from 'lucide-react'
import React, { useState } from 'react'
import SummaryCard from '../components/SummaryCard/SummaryCard'
import CategoryRow from '../components/CategoryRow/CategoryRow'

const Budgeting = () => {
  const [sortFiled, setSortFiled] = useState('highest');
  const [showSort, setShowSort] = useState(false);
  const sorts = [
    { value: 'highest', label: 'بیشترین مبلغ' },
    { value: 'lowest', label: 'کمترین مبلغ' },
  ]

  const categories = [
    {
      id: 1,
      title: 'غذا',
      textColor: 'text-success',
      bgColor: 'bg-success-light',
      icon: <Hamburger />
    },
    {
      id: 2,
      title: 'حمل و نقل',
      textColor: 'text-primary',
      bgColor: 'bg-primary-light',
      icon: <Car />
    },
    {
      id: 3,
      title: 'قبض',
      textColor: 'text-warning',
      bgColor: 'bg-warning-light',
      icon: <Receipt />
    },
    {
      id: 4,
      title: 'سرگرمی',
      textColor: 'text-purple',
      bgColor: 'bg-purple-light',
      icon: <Gamepad />
    },
    {
      id: 5,
      title: 'بهداشت',
      textColor: 'text-danger',
      bgColor: 'bg-danger-light',
      icon: <Hospital />
    },
    {
      id: 6,
      title: 'آموزش',
      textColor: 'text-yellow-300',
      bgColor: 'bg-yellow-100',
      icon: <Book />
    },
    {
      id: 7,
      title: 'سایر',
      textColor: 'text-text-secondary',
      bgColor: 'bg-surface-3',
      icon: <MoreHorizontal />
    },
  ];

  return (
    <div className='container mx-auto mt-5'>
      <header className=' flex justify-between items-center'>
        <div className=" flex items-center gap-3">
          <div className=' center-content border-border shadow-card p-1 rounded-sm'>
            <Calendar width={30} height={30} />
          </div>
          <div className=" flex flex-col gap-2">
            <span className='font-bold text-2xl'>بودجه بندی</span>
            <span className='text-text-secondary'>بودجه ماهانه خود را برای هر دسته مدیریت کنید.</span>
          </div>
        </div>
        <div className=" center-content max-w-[200px] w-full h-10 bg-surface border-border border-text-secondary rounded-sm shadow-card">مرداد ماه</div>
      </header>

      <div className="col-span-4 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4 mt-5">

        <SummaryCard
          title='تعداد دسته'
          value={(0).toLocaleString('fa')}
          icon={<LayoutGrid />}
          textColor='text-primary'
          bgColor='bg-primary-light'
        />
        <SummaryCard
          title='مانده بودجه'
          value={(0).toLocaleString('fa')}
          icon={<Wallet />}
          textColor='text-success'
          bgColor='bg-success-light'
        />
        <SummaryCard
          title='مجموع هزینه‌ها'
          value={(0).toLocaleString('fa')}
          icon={<TrendingDown />}
          textColor='text-danger'
          bgColor='bg-ganger-light'
        />
        <SummaryCard
          title='بودجه کل'
          value={(0).toLocaleString('fa')}
          icon={<WalletMinimal />}
          textColor='text-purple'
          bgColor='bg-purple-light'
        />

      </div>

      <div className='flex items-center justify-between mt-5'>
        <div
          className='max-w-[260px] w-full flex items-center gap-2'
          onClick={() => setShowSort(!showSort)}
        >
          <div className='w-full center-content btn-filter relative'>
            {sorts.find(sort => sort.value === sortFiled)?.label}
            <SortDesc />
            <div className={`w-full absolute translate-y-[80%] p-1 bg-surface border border-border rounded-sm text-sm transition-all duration-200 ${!showSort && 'invisible opacity-0'}`}>
              {sorts.map((sort, index) =>
                <div
                  key={index}
                  className='hover:bg-surface-2 p-2 rounded-sm'
                  onClick={() => setSortFiled(sort.value)}
                >
                  {sort.label}
                </div>)}
            </div>
          </div>
          <div className='center-content btn-filter relative'>
            فیلتر
            <Filter />
            <div className='absolute top-11 right-0 w-[400px] flex flex-col gap-4 bg-surface rounded-sm border border-border p-2 hidden'>
              <span className='font-bold text-lg border-b border-border pb-2'>فیلترها</span>

              <div className='p-2 border-b border-border flex flex-col gap-2'>
                <span>بودجه</span>
                <div className='flex flex-col mt-2'>
                  <div className='flex items-center justify-between'>
                    <span>0</span>
                    <span>100000000</span>
                  </div>
                  <input type="range" name="" id=""/>
                </div>
              </div>

              <div className='px-2'>
                <span>وضعیت</span>
                <ul className='text-sm flex flex-col gap-2 p-2'>
                  <div className='flex items-center justify-between'>
                    <li>عادی</li>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className='flex items-center justify-between'>
                    <li>در حال اتمام</li>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className='flex items-center justify-between'>
                    <li>تمام شده</li>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className='flex items-center justify-between'>
                    <li>تعیین نشده</li>
                    <input type="checkbox" name="" id="" />
                  </div>
                </ul>
              </div>


            </div>
          </div>
        </div>
        <div className='center-content gap-2 bg-primary text-white p-2 rounded-sm cursor-pointer transition-all duration-200 hover:bg-primary-light'>
          افزودن بودجه
          <Plus width={20} height={20} />
        </div>
      </div>

      <div className='flex flex-col gap-3 mt-10'>

        {categories.map(category =>
          <CategoryRow
            key={category.id}
            {...category}
            budget={3000000}
            cost={2200000}
          />
        )}

      </div>

    </div >
  )
}

export default Budgeting