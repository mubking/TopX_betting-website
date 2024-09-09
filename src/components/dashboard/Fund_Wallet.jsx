"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { _yY } from '../../lib/_hjs';


function FundWallet() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  

  const handleFundWallet = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/initializeTransaction', {
        email,
        amount,
      });

      if (response.data.url) {
        console.log(response.data)
        localStorage.setItem("_tyu", response.data.reference)
        window.location.href = response.data.url;
      } else {
        toast.error('Failed to initialize transaction');
      }
    } catch (error) {
      console.error('Error funding wallet:', error.response?.data || error.message);
      toast.error('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen p-5">
      <h1 className="text-center text-2xl">Fund Wallet</h1>

      <div className='text-2xl mt-5'>
        <h1>NGN {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h1>
        <h1>Estimated Total Balance</h1>
      </div>

      <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">
        Amount
      </label>
      <input
        type="text"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5"
        placeholder="Enter Amount in Number"
        required
      />

      <label htmlFor="email" className="block mt-5 mb-2 text-sm font-medium text-gray-900">
        Email address
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="john.doe@company.com"
        required
      />

      <button
        onClick={handleFundWallet}
        className="inline-flex text-white mt-10 bg-[#f178b6] border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Fund Now'}
      </button>
      <ToastContainer />

    </div>
  );
}

export default FundWallet;
