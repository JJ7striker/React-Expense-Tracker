import React from 'react'

const Dashboard = () => {

  const cards = [
    {
      title: "Total Balance",
      amount: 0,
    },
    {
      title: "Total Income",
      amount: 0,
    },
    {
      title: "Total Expenses",
      amount: 0,
    },
   
  ]

  return (
    <div className='px-3 py-4'>
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-start flex-col gap-1'>
          <h2 className='text-lg font-medium text-gray-800'>Dashboard</h2>
          <p className='text-gray-700 font-medium'>Track your progress today!</p>
        </div>

      </div>

       <div className='w-full grid grid-cols-1 md:grid-cols-3 px-8 mt-5 gap-5'>
          {cards.map(card => (
            <div className='w-full px-4 py-3 flex flex-col items-start shadow-sm shadow-gray-500'>
              <h2 className='text-lg'>{card.title}</h2>
              <p className='text-2xl'>$ {card.amount}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Dashboard