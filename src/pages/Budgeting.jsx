import { Calendar, Filter, Hamburger, LayoutGrid, NotebookTabs, Plus, SortAsc, SortDesc, TrendingDown, Wallet, WalletMinimal } from 'lucide-react'
import React from 'react'
import SummaryCard from '../components/SummaryCard/SummaryCard'
import CategoryRow from '../components/CategoryRow/CategoryRow'

const Budgeting = () => {
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
        <div className='flex items-center gap-2'>
          <div className='center-content gap-2 border-border border-text-secondary shadow-card px-4 py-2 rounded-sm'>
            مرتب سازی
            <SortDesc />
          </div>
          <div className='center-content gap-2 border-border border-text-secondary shadow-card px-4 py-2 rounded-sm'>
            فیلتر
            <Filter />
          </div>
        </div>
        <div className='center-content gap-2 bg-primary text-white p-2 rounded-sm'>
          افزودن بودجه
          <Plus width={20} height={20} />
        </div>
      </div>

      <div className='flex flex-col gap-3 mt-10'>
        <CategoryRow
          title='غذا و خوراکی'
          textColor='text-success'
          bgColor='bg-success-light'
          icon={<Hamburger />}
          budget={2200000}
          remainder={300000}
          statusBudget='hard'
        />
      </div>

    </div>
  )
}

export default Budgeting