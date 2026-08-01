import React from 'react'
import NotFountBudgeting from '../NotFountBudgeting/NotFountBudgeting'

function BoxBudget({ budgets }) {
  return (
    <div className='box-budget card bg-surface rounded-sm shadow-sm px-3 pt-5 pb-2'>
      <span className='box-budget__title font-bold'>بودجه بندی</span>
      <div className="box-budget__body">
        {!budgets && <NotFountBudgeting />}
      </div>
    </div>
  )
}

export default BoxBudget