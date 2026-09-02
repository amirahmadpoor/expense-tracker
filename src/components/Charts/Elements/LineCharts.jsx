import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { useMemo, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function LineCharts({ costs }) {
    const [page, setPage] = useState(0);

    const chartData = useMemo(() => {
        const months = [
            { id: 1, name: 'فروردین', amount: 0, },
            { id: 2, name: 'اردیبهشت', amount: 0, },
            { id: 3, name: 'خرداد', amount: 0, },
            { id: 4, name: 'تیر', amount: 0, },
            { id: 5, name: 'مرداد', amount: 0, },
            { id: 6, name: 'شهریور', amount: 0, },
            { id: 7, name: 'مهر', amount: 0, },
            { id: 8, name: 'آبان', amount: 0, },
            { id: 9, name: 'آذر', amount: 0, },
            { id: 10, name: 'دی', amount: 0, },
            { id: 11, name: 'بهمن', amount: 0, },
            { id: 12, name: 'اسفند', amount: 0, },
        ]

        const toEnglishNumber = str =>
            str.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

        costs.filter(cost => cost.type === 'expense')
            .forEach(expense => {
                const expenseMonth = Number(
                    toEnglishNumber(new Date(expense.date).toLocaleDateString('fa-IR').split('/')[1])
                );

                months[expenseMonth - 1].amount += Number(expense.amount)
            })

        return months.slice(page * 6, page * 6 + 6);
    }, [costs, page]);

    return (
        <div className="analytic__line-chart flex w-full min-w-0 flex-col gap-4 rounded-sm border-field bg-surface p-3 shadow-card">
            <div className="line-chart-header flex items-center justify-between gap-3">
                <span className='text-sm font-bold text-text-primary md:text-base'>
                    {page === 0 ? 'هزینه نیمسال اول' : 'هزینه نیمسال دوم'}
                </span>
                <div className="select-month flex items-center gap-2">
                    <button
                        type="button"
                        aria-label="نیمسال قبل"
                        className={`select-month__previous inline-flex w-9 h-9 items-center justify-center rounded-full border border-border bg-surface-2 text-text-primary transition hover:border-primary hover:bg-primary-light hover:text-primary ${page !== 1 ? 'opacity-40' : ''}`}
                        onClick={() => setPage(0)}
                        disabled={page !== 1}
                    >
                        <ArrowRightCircle className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        aria-label="نیمسال بعد"
                        className={`select-month__next inline-flex w-9 h-9 items-center justify-center rounded-full border border-border bg-surface-2 text-text-primary transition hover:border-primary hover:bg-primary-light hover:text-primary ${page !== 0 ? 'opacity-40' : ''}`}
                        onClick={() => setPage(1)}
                        disabled={page !== 0}
                    >
                        <ArrowLeftCircle className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="h-55 w-full min-w-0 overflow-hidden sm:h-60 md:h-70 lg:h-80 p-2">
                <ResponsiveContainer width='100%' height='100%'>
                    <LineChart
                        data={chartData}
                        margin={{ top: 8, right: 8, left: 15, bottom: 0 }}
                    >
                        <XAxis
                            dataKey="name"
                            tick={{ fill: 'var(--text-secondary)' }}
                            fontSize={11}
                            interval={0}
                            reversed
                            tickMargin={10}
                        />
                        <YAxis
                            width={60}
                            tick={{ fill: 'var(--text-secondary)' }}
                            fontSize={11}
                            tickFormatter={(value) => value.toLocaleString("fa-IR")}
                            orientation="right"
                            tickMargin={60}
                            domain={[0, (dataMax) => (dataMax === 0 ? 1000000 : dataMax)]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-md)',
                                boxShadow: 'var(--shadow-card)',
                                fontSize: 'var(--text-small)',
                                color: 'var(--text-primary)'
                            }}
                            formatter={(value) => value.toLocaleString("fa-IR")}
                        />
                        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                        <Line
                            type="monotone"
                            dataKey="amount"
                            name='جمع کل'
                            stroke="var(--color-primary)"
                            strokeWidth={3}
                            unit=' تومان'
                            dot={{ r: 3, fill: 'var(--color-primary)' }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer >
            </div>
        </div>
    )
}
export default LineCharts