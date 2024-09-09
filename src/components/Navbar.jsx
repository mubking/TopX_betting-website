"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

function Navbar() {
  const router = useRouter()

  const handleJoinClick = (e) => {
    e.preventDefault();
    router.push("/signup")
  };

  return (
    <div className='bg-[black] h-[15vh] text-[20px] flex p-5 justify-between  items-center '>

    <div className='md:block hidden'>
      <ul className='flex item-center gap-8 cursor-pointer'>
        <li>Log in</li>
        <li className=' text-[#f178b6]'>Trending Bets</li>
      </ul>
    </div>
    <div className='cursor-pointer'>
        <img src="/Logo.png" alt="" style={{height:"10vh"}} />
          
    </div>
    <div >
      <ul className='flex item-center gap-8 cursor-pointer '>
        <li className='py-2'>New Challenges</li>
        <li> <button 
        onClick={handleJoinClick}
        class="inline-flex text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded " style={{border:"2px solid white"}}
        >
        Join
        </button></li>
      </ul>
    </div>
        
        
    </div>
  )
}

export default Navbar