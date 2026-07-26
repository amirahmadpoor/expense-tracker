import React from 'react'
import LineCharts from './Elements/LineCharts'

function Charts({ costs }) {
    return (
        <div className="analytic card col-span-3 w-full bg-surface rounded-sm px-3 pt-5 pb-2">
            <span className='font-bold'>آمار</span>
            <div className="analytic__charts flex items-center h-[260px] gap-2 mt-5">
                <LineCharts costs={costs} />
                {/* <div className="analytic__bar-chart w-full h-[250px] border-field shadow-card">
                    <LineChart />
                </div>*/}
                <div className="analytic__pie-chart w-full h-full border-field shadow-card">
                    {/* <LineChart /> */}
                </div>
            </div>
        </div>
    )
}

export default Charts