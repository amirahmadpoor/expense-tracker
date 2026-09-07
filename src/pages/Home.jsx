import { createContext, useEffect, useState } from 'react'
import RecentTransactions from '../components/RecentTransactions/RecentTransactions'
import Charts from '../components/Charts/Charts'
import BoxBudget from '../components/BoxBudget/BoxBudget'
import AddCostForm from '../components/AddCostForm/AddCostForm'
import { NotebookTabs, TrendingDown, TrendingUp, WalletMinimal } from 'lucide-react'
import { getTransactionsController, deleteTransactionController } from '../controllers/transactions.controller'
import Loading from '../components/Loading/Loading'

export const TransactionsContext = createContext(null);
const Home = () => {


    const [editingTransaction, setEditingTransaction] = useState(null);

    const [transactions, setTransactions] = useState([]);

    const [loading, setLoading] = useState(false);


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

    useEffect(() => {
        const getTransactions = async () => {
            setLoading(true);
            const response = await getTransactionsController();
            setTransactions(response);
            setLoading(false);
        }

        getTransactions();
    }, []);


    const allBuy =
        transactions
            .filter(transaction => transaction.type === 'expense')
            .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    const allIncome =
        transactions
            .filter(transaction => transaction.type === 'income')
            .reduce((sum, transaction) => sum + Number(transaction.amount), 0);


    const balance = allIncome - allBuy;


    const deleteTransaction = async (id) => {
        const response = await deleteTransactionController(id);

        if (response) {
            setTransactions(await getTransactionsController());
        }
    };

    return (
        <div className='container mx-auto mt-2 grid gap-2 md:grid-cols-4'>

            <div className="statistics col-span-4 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
                <div className="box card flex h-full w-full min-w-0 items-center justify-between rounded-sm bg-surface p-4">
                    <div className="box__title-price flex flex-col">
                        <span className='box__title'>کل در آمد</span>
                        {loading ?
                            <Loading className="w-4 h-4 mt-2" /> :
                            <span className='box__price text-success'>{Number(allIncome || 0).toLocaleString("fa-IR")} تومان</span>
                        }
                    </div>
                    <div className='box__icon p-4 rounded-full text-success bg-success-light'><TrendingUp /></div>
                </div>

                <div className="box card flex h-full w-full min-w-0 items-center justify-between rounded-sm bg-surface p-4">
                    <div className="box__title-price flex flex-col">
                        <span className='box__title'>کل هزینه</span>
                        {loading ?
                            <Loading className="w-4 h-4 mt-2" /> :
                            <span className='box__price text-danger'>{Number(allBuy || 0).toLocaleString("fa-IR")} تومان</span>
                        }
                    </div>
                    <div className='box__icon p-4 rounded-full text-danger bg-danger-light'><TrendingDown /></div>
                </div>

                <div className="box card flex h-full w-full min-w-0 items-center justify-between rounded-sm bg-surface p-4">
                    <div className="box__title-price flex flex-col">
                        <span className='box__title'>موجودی</span>
                        {loading ?
                            <Loading className="w-4 h-4 mt-2" /> :
                            <span className='box__price text-primary'>{Number(balance).toLocaleString('fa-IR')} تومان</span>
                        }
                    </div>
                    <div className='box__icon p-4 rounded-full bg-primary-light text-primary'><WalletMinimal /></div>
                </div>
                <div className="box card flex h-full w-full min-w-0 items-center justify-between rounded-sm bg-surface p-4">
                    <div className="box__title-price flex flex-col">
                        <span className='box__title'>تراکنش‌ها</span>
                        {loading ?
                            <Loading className="w-4 h-4 mt-2" /> :
                            <span className='box__price text-purple'>{transactions.length.toLocaleString('fa-IR')}</span>
                        }
                    </div>
                    <div className='box__icon p-4 rounded-full bg-purple-light text-purple'><NotebookTabs /></div>
                </div>
            </div>

            <div className='col-span-4 grid gap-2 lg:grid-cols-4 grid-cols-1'>
                <TransactionsContext
                    value={{
                        typeCost,
                        categories,
                        setTransactions,
                        editingTransaction,
                        setEditingTransaction,
                        transactions,
                        deleteTransaction,
                        loading,
                    }}
                >

                    <div className="main-right flex min-w-0 flex-col gap-2">
                        <AddCostForm />

                        <BoxBudget />
                    </div>

                    <div className="main-left flex flex-col gap-2 md:col-span-3 col-span-1">
                        <RecentTransactions />

                        <Charts />
                    </div>
                </TransactionsContext>
            </div>
        </div>
    )
}

export default Home