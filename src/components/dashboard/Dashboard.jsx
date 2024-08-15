"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

import { FaEye, FaEyeSlash } from "react-icons/fa";


function Dashboard() {
  const router = useRouter()

  const handleWalletClick = (e) => {
    e.preventDefault();
    router.push("/fund_wallet")
    // Add your form submission logic here
  };
  const handleWalletWithdraw = (e) => {
    e.preventDefault();
    router.push("/withdraw_funds")
    // Add your form submission logic here
  };

  return (
    <div className=' p-5 w-full h-screen'>
     <div className="flex justify-between items-center ">
       <div className='w-full'>
        <h1 className='text-2xl'>Hey Tosh,</h1>
        <h1 className='text-2xl mt-2'> Welcome to Top X</h1>
        <p className='text-[#acacac] mt-3 text-lg'>There are many possibilities you can achieve with us. Let’s help you gain reward for what you do doing the most!</p>
       </div>
       <div className='w-full'>
        <img src="/Topxtransparent black 1.png" alt="" style={{height:"40vh"}} />
       </div>
     </div>
      
      <div className='bg-[#7879f1] h-[50vh] w-full rounded p-5' style={{borderRadius:"30px"}}>
        <div className='flex item-center gap-5 '>
        <div>
        <h2 className='text-white text-lg mt-'>Available Balance   </h2>
        </div>
        <div className='mt-2'> 
        <FaEye /> 
        </div>
        

        </div>
        
          <div className='text-2xl mt-5'>
          <h1>NGN 25,000.00</h1>
          <h1>Estimated Total Balance</h1>
          </div>


         <div className='flex justify-between  mt-10 '>
          <button class="inline-flex text-white bg-[#373742] border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                     onClick={handleWalletClick}
>
              Fund Wallet
          </button>

           <button class="inline-flex  bg-[white]  text-[#373742] border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
           onClick={handleWalletWithdraw}
           >
               Withdraw Funds
           </button>   
         </div>

      </div>

    </div>
  )
}

export default Dashboard