import React from 'react'
import LineCharts from './Elements/LineCharts'

function Charts({ costs }) {
    return (
        <div className="analytic col-span-3 w-full bg-white rounded-sm px-3 pt-5 pb-2">
            <span className='font-bold'>آمار</span>
            <div className="analytic__charts flex flex-col gap-2 mt-5">
                <div className="analytic__line-chart w-full h-[250px] border-field shadow-card">
                    <LineCharts costs={costs} />
                </div>
                {/* <div className="analytic__bar-chart w-full h-[250px] border-field shadow-card"> */}
                    {/* <LineChart /> */}
                {/* </div> */}
                <div className="analytic__pie-chart w-full h-[250px] border-field shadow-card">
                    {/* <LineChart /> */}
                </div>
            </div>
        </div>
    )
}

export default Charts