import React from 'react'
import './App.css'
import AddCostForm from './components/AddCostForm/AddCostForm'
import RecentTransactions from './components/RecentTransactions/RecentTransactions'
import { TrendingDown, TrendingUp, User, WalletMinimal } from 'lucide-react'

function App() {
  return (
    <>
      <div className='container m-auto mt-8 '>
        <header className='w-full h-30 bg-white flex items-center rounded-lg'>
          <div className="header-wrapper m-auto w-5xl flex items-center justify-between">
            <div className="brand flex gap-2 items-center">
              <span>
                <img src="/public/logo.png" alt="" width={50}/>
              </span>
              <h2 className='font-bold text-2xl'>مدیریت هزینه</h2>
            </div>
            <div className='flex items-center gap-2.5'>
              <span><User /></span>
              <span className='w-20 h-8 flex items-center justify-center rounded-lg bg-gray-200'>کاربر</span>
            </div>
          </div>
        </header>

        <div>
          <div className="Statistics w-full h-30 mt-8 flex items-center gap-4">
            <div className="box w-full h-full bg-white flex items-center justify-between rounded-lg p-4">
              <div className="box__title-price flex flex-col">
                <span className='box__title'>کل در آمد</span>
                <span className='box__price text-green-600'>0</span>
              </div>
              <div className='box__icon p-4 rounded-full bg-green-200 text-green-600'><TrendingUp /></div>
            </div>

            <div className="box w-full h-full bg-white flex items-center justify-between rounded-lg p-4">
              <div className="box__title-price flex flex-col">
                <span className='box__title'>کل هزینه</span>
                <span className='box__price text-red-600'>0</span>
              </div>
              <div className='box__icon p-4 rounded-full bg-red-200 text-red-600'><TrendingDown /></div>
            </div>

            <div className="box w-full h-full bg-white flex items-center justify-between rounded-lg p-4">
              <div className="box__title-price flex flex-col">
                <span className='box__title'>موجودی</span>
                <span className='box__price text-blue-600'>0</span>
              </div>
              <div className='box__icon p-4 rounded-full bg-blue-200 text-blue-600'><WalletMinimal /></div>
            </div>
          </div>
        </div>

        <div className="add-transaction-recent-transactions flex gap-2.5 mt-8 h-120">
          <AddCostForm />
          <RecentTransactions />
        </div>
      </div>

    </>
  )
}

export default App