import LineCharts from './Elements/LineCharts'

function Charts({ transactions }) {
    return (
        <div className="analytic card w-full min-w-0 rounded-sm bg-surface p-3 md:p-4">
            <span className='text-sm font-bold text-text-primary md:text-base'>آمار</span>
            <div className="analytic__charts mt-4 flex flex-col gap-3">
                <LineCharts transactions={transactions} />
            </div>
        </div>
    )
}

export default Charts