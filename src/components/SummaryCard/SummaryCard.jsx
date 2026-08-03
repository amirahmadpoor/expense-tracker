import React from 'react'

const SummaryCard = ({ title, value = 0, icon, textColor, bgColor }) => {
    return (
        <div className="box card flex h-full w-full min-w-0 items-center justify-between rounded-sm bg-surface p-4">
            <div className="flex flex-col">
                <span>{title}</span>
                <span className={`${textColor}`}>{value} دسته</span>
            </div>
            <div className={`box__icon p-4 rounded-full ${textColor} ${bgColor}`}>{icon}</div>
        </div>
    )
}

export default SummaryCard