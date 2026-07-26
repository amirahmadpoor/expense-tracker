import { ArrowLeft, ArrowLeftCircle, ArrowRight, ArrowRightCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function LineCharts({ costs }) {
    const [page, setPage] = useState(0);
    const months = [
        { id: 1, name: 'فروردین', amount: null, },
        { id: 2, name: 'اردیبهشت', amount: null, },
        { id: 3, name: 'خرداد', amount: null, },
        { id: 4, name: 'تیر', amount: null, },
        { id: 5, name: 'مرداد', amount: null, },
        { id: 6, name: 'شهریور', amount: null, },
        { id: 7, name: 'مهر', amount: null, },
        { id: 8, name: 'آبان', amount: null, },
        { id: 9, name: 'آذر', amount: null, },
        { id: 10, name: 'دی', amount: null, },
        { id: 11, name: 'بهمن', amount: null, },
        { id: 12, name: 'اسفند', amount: null, },
    ]

    const getExpenses = () => {
        return costs.filter(cost => cost.type === 'expense');
    }


    const getAmountsExpense = () => {
        const expenses = getExpenses();

        const toEnglishNumber = str =>
            str.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

        expenses.forEach(expense => {
            const expenseMonth = Number(
                toEnglishNumber(expense.date.toLocaleDateString('fa-IR').split('/')[1])
            );

            months[expenseMonth - 1].amount += Number(expense.amount)
        })
        return months;
    }

    const chartData = getAmountsExpense().slice(page * 6, page * 6 + 6);


    return (
        <div className="analytic__line-chart w-full h-full border-field shadow-card p-2">
            <div className="line-chart-header flex items-center justify-between">
                <span className='font-bold text-sm'>
                    {page === 0 ? 'هزینه نیمسال اول' : 'هزینه نیمسال دوم'}
                </span>
                <div className="select-month flex">
                    <div
                        className={`select-month__next flex gap-2 ${page !== 0 && 'hidden'}`}
                        onClick={() => setPage(1)}
                    >
                        <ArrowLeftCircle />
                    </div>
                    <div
                        className={`select-month__previous ${page !== 1 && 'hidden'}`}
                        onClick={() => setPage(0)}
                    >
                        <ArrowRightCircle />
                    </div>
                </div>
            </div>

            <ResponsiveContainer width='100%' height='95%' >
                <LineChart
                    data={chartData}
                    style={{
                        padding: '0.5rem'
                    }}
                >
                    <XAxis
                        dataKey="name"
                        fontSize={12}
                        interval={0}
                        reversed
                    />
                    <YAxis
                        width={65}
                        fontSize={12}
                        tickFormatter={(value) => value.toLocaleString("fa-IR")}
                        orientation="right"
                        tickMargin={60}
                        domain={[0, (dataMax) => (dataMax === 0 ? 1000000 : dataMax)]}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,.15)",
                            fontSize: '12px'
                        }}
                        formatter={(value) => value.toLocaleString("fa-IR")}
                    />
                    <CartesianGrid />
                    <Line
                        type="monotone"
                        dataKey="amount"
                        name='جمع کل'
                        stroke="var(--color-primary)"
                        strokeWidth={2}
                        connectNulls
                        unit=' تومان'
                        dot={{ r: 4, fill: 'var(--color-primary)' }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer >
        </div>
    )
}
export default LineCharts