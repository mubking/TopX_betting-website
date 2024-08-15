import React from 'react'

function TrendingBets() {
  return (
    <div className='p-5 w-full'>
     <div className="flex justify-between">
       <div className='w-full'> 
      <h1 className='text-2xl'>Hey Tosh,</h1>
      <h1 className='text-2xl'>Explore the trending bets</h1>
      <p className='text-lg mt-3'>There are many possibilities you can achieve with us. Let’s help you gain reward for what you do doing the most!</p></div>
      
       <div className='w-full'></div>
     </div>
     <h1 className='text-2xl mt-3'>Trending Bets </h1>

     

<div class="relative overflow-x-auto mt-5">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-[#7879f1] dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 text-lg">
                    players name
                </th>
                <th scope="col" class="px-6 py-3 text-lg">
                Game Time (A T)
                </th>
                <th scope="col" class="px-6 py-3 text-lg">
                Amount Stake
                </th>
                <th scope="col" class="px-6 py-3 text-lg">
                Winners Take Home
                </th>
                <th scope="col" class="px-6 py-3 text-lg">
                Status
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[19px] bg-[#f178b6]">
                Toshmoney VS Toshbaba
                </th>
                <td class="px-6 py-4  text-[#f178b6] text-[19px]">
                    04:45 PM
                </td>
                <td class="px-6 py-4 text-[19px]">
                    NGN 20,000
                </td>
                <td class="px-6 py-4 text-[19px]">
NGN 40,000                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[19px] bg-[#f178b6]">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4  text-[#f178b6] text-[19px]">
                    04:45 PM
                </td>
                <td class="px-6 py-4 text-[19px]">
NGN 20,000                </td>
                <td class="px-6 py-4 text-[19px]">
                NGN 40,000                </td>
                <td class="px-6 py-4 text-[19px]">
                    <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Ongoing
                    </div>
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[19px] bg-[#f178b6]">
NGN 20,000                </th>
                <td class="px-6 py-4  text-[#f178b6] text-[19px]">
                    04:45 PM
                </td>
                <td class="px-6 py-4 text-[19px]">
                    NGN 20,000
                </td>
                <td class="px-6 py-4 text-[19px]">
NGN 40,000                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Completed
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>

    </div>
  )
}

export default TrendingBets