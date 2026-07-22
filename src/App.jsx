import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import AddCostForm from './components/AddCostForm/AddCostForm'
import RecentTransactions from './components/RecentTransactions/RecentTransactions'
import { icons, LineChart, NotebookTabs, TrendingDown, TrendingUp, User, WalletMinimal } from 'lucide-react'
import toast from 'react-hot-toast'
import Charts from './components/Charts/Charts'
// import BoxBudget from './components/BoxBudget/BoxBudget'

function App() {
  const [modal, setModal] = useState(false);

  let db = useRef(null);
  let objectStore = null;

  const [costs, setCosts] = useState([]);
  const [editingCost, setEditingCost] = useState(null);

  const typeCost = [
    { value: 'expense', label: 'هزینه' },
    { value: 'income', label: 'درآمد' },
  ];

  const categories = [
    { value: 'food', label: 'غذا' },
    { value: 'transport', label: 'حمل و نقل' },
    { value: 'bill', label: 'قبض' },
    { value: 'entertainment', label: 'سرگرمی' },
    { value: 'shopping', label: 'خرید' },
    { value: 'health', label: 'بهداشت' },
    { value: 'education', label: 'آموزش' },
    { value: 'other', label: 'سایر' },
  ];

  const allBuy = costs
    .filter(cost => cost.type === 'expense')
    .reduce((sum, cost) => sum + Number(cost.amount), 0);

  const allIncome = costs
    .filter(cost => cost.type === 'income')
    .reduce((sum, cost) => sum + Number(cost.amount), 0);

  const balance = allIncome - allBuy;

  const getAllCostsDB = () => {
    return new Promise((resolve, reject) => {
      const transaction = db.current.transaction('costs', 'readonly');
      const store = transaction.objectStore('costs');

      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      }

      request.onerror = () => {
        reject(request.error);
      }

    })
  }

  const showSuccessToast = (text) => {
    toast.success(text);
  }

  const showErrorToast = (text) => {
    toast.error(text);
  }

  const addCostsDB = (cost) => {
    const transaction = db.current.transaction('costs', 'readwrite');
    const store = transaction.objectStore('costs');
    const request = store.add(cost);

    request.onsuccess = async () => {
      showSuccessToast('تراکنش با موفقیت اضافه شد.');
      const costs = await getAllCostsDB();
      setCosts(costs)
    }

    request.onerror = () => {
      showSuccessToast('تراکنش با موفقیت اضافه نشد.');
    }
  }

  const editCostsDB = (cost) => {
    const transaction = db.current.transaction('costs', 'readwrite');
    const store = transaction.objectStore('costs');
    if (cost.id !== undefined) {
      const request = store.put(cost);
      request.onsuccess = async () => {
        showSuccessToast('ویرایش با موفقیت انجام شد.')
        const costs = await getAllCostsDB();
        setCosts(costs)
      }

      request.onerror = () => {
        showErrorToast('ویرایش انجام نشد.')
      }
    }
  }

  const removeCostsDB = (id) => {
    const transaction = db.current.transaction('costs', 'readwrite');
    const store = transaction.objectStore('costs');
    const request = store.delete(id);
    request.onsuccess = async () => {
      showSuccessToast('تراکنش با موفقیت حذف شد.');
      const costs = await getAllCostsDB();
      setCosts(costs)
    }

    request.onerror = () => {
      showErrorToast('تراکنش حذف نشد');
    }
  };


  useEffect(() => {
    let indexDB = indexedDB.open('expense-tracker', 1);

    indexDB.onupgradeneeded = (e) => {
      db.current = e.target.result;
      if (!db.current.objectStoreNames.contains('costs')) {
        objectStore = db.current.createObjectStore('costs', {
          keyPath: 'id',
          autoIncrement: true,
        })
      }
    }

    indexDB.onsuccess = async (e) => {
      db.current = e.target.result;
      const costs = await getAllCostsDB();
      setCosts(costs)
    }

  }, [])

  return (
    <div className='container grid sm:grid-cols-2 md:grid-cols-4 gap-2 mx-auto'>
      <div className='overlay fixed inset-0 bg-black opacity-60 hidden'></div>
      <header className='col-span-full w-full h-30 bg-white flex items-center rounded-sm'>
        <div className="header-wrapper m-auto w-5xl flex items-center justify-between">
          <div className="brand flex gap-2 items-center">
            <span>
              <img src="/expense-tracker/logo.png" alt="" width={50} />
            </span>
            <h2 className='font-bold text-2xl'>مدیریت هزینه</h2>
          </div>
          <div className='flex items-center gap-2.5'>
            <span><User /></span>
            <span className='w-20 h-8 flex items-center justify-center rounded-lg bg-gray-200'>کاربر</span>
          </div>
        </div>
      </header>

      <div className="statistics w-full min-h-[30] col-span-4 flex items-center flex-wrap md:flex-nowrap gap-2">
        <div className="box w-full min-w-[230px] h-full bg-white flex items-center justify-between rounded-sm p-4">
          <div className="box__title-price flex flex-col">
            <span className='box__title'>کل در آمد</span>
            <span className='box__price text-success'>{Number(allIncome || 0).toLocaleString("fa-IR")} تومان</span>
          </div>
          <div className='box__icon p-4 rounded-full text-success bg-success-light'><TrendingUp /></div>
        </div>

        <div className="box w-full min-w-[230px] h-full bg-white flex items-center justify-between rounded-sm p-4">
          <div className="box__title-price flex flex-col">
            <span className='box__title'>کل هزینه</span>
            <span className='box__price text-danger'>{Number(allBuy || 0).toLocaleString("fa-IR")} تومان</span>
          </div>
          <div className='box__icon p-4 rounded-full text-danger bg-danger-light'><TrendingDown /></div>
        </div>

        <div className="box w-full min-w-[230px] h-full bg-white flex items-center justify-between rounded-sm p-4">
          <div className="box__title-price flex flex-col">
            <span className='box__title'>موجودی</span>
            <span className='box__price text-primary'>{Number(allIncome - allBuy).toLocaleString('fa-IR')} تومان</span>
          </div>
          <div className='box__icon p-4 rounded-full bg-primary-light text-primary'><WalletMinimal /></div>
        </div>
        <div className="box w-full min-w-[230px] h-full bg-white flex items-center justify-between rounded-sm p-4">
          <div className="box__title-price flex flex-col">
            <span className='box__title'>تراکنش‌ها</span>
            <span className='box__price text-purple'>{costs.length.toLocaleString('fa-IR')}</span>
          </div>
          <div className='box__icon p-4 rounded-full bg-purple-light text-purple'><NotebookTabs /></div>
        </div>
      </div>

      <AddCostForm
        typeCost={typeCost}
        categories={categories}
        costs={costs}
        setCosts={setCosts}
        addCostsDB={addCostsDB}
        getAllCostsDB={getAllCostsDB}
        editingCost={editingCost}
        editCostsDB={editCostsDB}
        setEditingCost={setEditingCost}
      />

      <RecentTransactions
        costs={costs}
        setCosts={setCosts}
        removeCostsDB={removeCostsDB}
        editingCost={editingCost}
        setEditingCost={setEditingCost}
        typeCost={typeCost}
        categories={categories}
      />

      <BoxBudget />

      <Charts
        costs={costs}
      />


      {/* <FilterCosts /> */}
    </div>
  )
}

export default App