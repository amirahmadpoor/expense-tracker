import React, { useEffect, useRef, useState } from 'react'
import RecentTransactions from '../components/RecentTransactions/RecentTransactions'
import Charts from '../components/Charts/Charts'
import BoxBudget from '../components/BoxBudget/BoxBudget'
import AddCostForm from '../components/AddCostForm/AddCostForm'
import { NotebookTabs, TrendingDown, TrendingUp, WalletMinimal } from 'lucide-react'
import toast from 'react-hot-toast'

const Home = () => {
    const [modal, setModal] = useState(false);
    const [editingCost, setEditingCost] = useState(null);

    let db = useRef(null);
    let objectStore = null;
    const [costs, setCosts] = useState([]);
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

    }, []);


    const typeCost = [
        { value: 'expense', label: 'هزینه' },
        { value: 'income', label: 'درآمد' },
    ];

    const categories = [
        { value: 'food', label: 'غذا' },
        { value: 'transport', label: 'حمل و نقل' },
        { value: 'bill', label: 'قبض' },
        { value: 'entertainment', label: 'سرگرمی' },
        { value: 'health', label: 'بهداشت' },
        { value: 'education', label: 'آموزش' },
        { value: 'other', label: 'سایر' },
    ];

    const allBuy =
        costs
            .filter(cost => cost.type === 'expense')
            .reduce((sum, cost) => sum + Number(cost.amount), 0);

    const allIncome =
        costs
            .filter(cost => cost.type === 'income')
            .reduce((sum, cost) => sum + Number(cost.amount), 0);


    const balance = allIncome - allBuy;


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
            setCosts(costs);
        }

        request.onerror = () => {
            showErrorToast('تراکنش حذف نشد');
        }
    };

    return (
        <div className='container mx-auto mt-2 grid gap-2 md:grid-cols-4'>

            <div className="statistics col-span-4 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
                <div className="box card flex h-full w-full min-w-0 items-center justify-between rounded-sm bg-surface p-4">
                    <div className="box__title-price flex flex-col">
                        <span className='box__title'>کل در آمد</span>
                        <span className='box__price text-success'>{Number(allIncome || 0).toLocaleString("fa-IR")} تومان</span>
                    </div>
                    <div className='box__icon p-4 rounded-full text-success bg-success-light'><TrendingUp /></div>
                </div>

                <div className="box card flex h-full w-full min-w-0 items-center justify-between rounded-sm bg-surface p-4">
                    <div className="box__title-price flex flex-col">
                        <span className='box__title'>کل هزینه</span>
                        <span className='box__price text-danger'>{Number(allBuy || 0).toLocaleString("fa-IR")} تومان</span>
                    </div>
                    <div className='box__icon p-4 rounded-full text-danger bg-danger-light'><TrendingDown /></div>
                </div>

                <div className="box card flex h-full w-full min-w-0 items-center justify-between rounded-sm bg-surface p-4">
                    <div className="box__title-price flex flex-col">
                        <span className='box__title'>موجودی</span>
                        <span className='box__price text-primary'>{Number(balance).toLocaleString('fa-IR')} تومان</span>
                    </div>
                    <div className='box__icon p-4 rounded-full bg-primary-light text-primary'><WalletMinimal /></div>
                </div>
                <div className="box card flex h-full w-full min-w-0 items-center justify-between rounded-sm bg-surface p-4">
                    <div className="box__title-price flex flex-col">
                        <span className='box__title'>تراکنش‌ها</span>
                        <span className='box__price text-purple'>{costs.length.toLocaleString('fa-IR')}</span>
                    </div>
                    <div className='box__icon p-4 rounded-full bg-purple-light text-purple'><NotebookTabs /></div>
                </div>
            </div>

            <div className='col-span-4 grid gap-2 lg:grid-cols-4 grid-cols-1'>
                <div className="main-right flex min-w-0 flex-col gap-2">
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

                    <BoxBudget />
                </div>

                <div className="main-left flex flex-col gap-2 md:col-span-3 col-span-1">
                    <RecentTransactions
                        costs={costs}
                        removeCostsDB={removeCostsDB}
                        editingCost={editingCost}
                        setEditingCost={setEditingCost}
                        typeCost={typeCost}
                        categories={categories}
                    />

                    <Charts
                        costs={costs}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home