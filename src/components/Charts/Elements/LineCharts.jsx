import React, { useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function LineCharts({ costs }) {
    const months = [
        { id: 1, name: 'فروردین' },
        { id: 2, name: 'اردیبهشت' },
        { id: 3, name: 'خرداد' },
        { id: 4, name: 'تیر' },
        { id: 5, name: 'مرداد' },
        { id: 6, name: 'شهریور' },
        { id: 7, name: 'مهر' },
        { id: 8, name: 'آبان' },
        { id: 9, name: 'آذر' },
        { id: 10, name: 'دی' },
        { id: 11, name: 'بهمن' },
        { id: 12, name: 'اسفند' },
    ]

    const getExpenses = () => {
        return costs.filter(cost => cost.type === 'expense');
    }


    const getAmountsExpense = () => {
        const expenses = getExpenses();

        const toEnglishNumber = str =>
            str.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

        return months.map(month => {
            const total = expenses.filter(expense => {

                const expenseMonth = Number(
                    toEnglishNumber(expense.date.toLocaleDateString('fa-IR').split('/')[1])
                );
                return expenseMonth === month.id;
            })
                .reduce((sum, expense) => sum + Number(expense.amount), 0)

            return {
                month: month.id,
                name: month.name,
                amount: total || null,
            }
        })
    }

    console.log(getAmountsExpense());



    return (
        <ResponsiveContainer width='100%' height='100%' >
            <LineChart
                data={getAmountsExpense()}
                style={{
                    padding: '0.5rem'
                }}
            >
                <XAxis
                    dataKey="name"
                    interval={0}
                    reversed
                />
                <YAxis
                    width={65}
                    tickFormatter={(value) => value.toLocaleString("fa-IR")}
                    orientation="right"
                    tickMargin={70}
                />
                <Tooltip
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
    )
}

export default LineCharts