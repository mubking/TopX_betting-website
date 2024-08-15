"use client";
import React from "react";
import { useRouter } from "next/navigation";

function Fund_wallet() {
  return (
    <div className="w-full h-screen p-5   ">
      <h1 className=" text-center text-2xl ">Fund Wallet</h1>
      <label
        for="first_name"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-[black]"
      >
        Amount
      </label>
      <div className="flex flex-col">
        <input
          type="text"
          id="Amount"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text- dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Amount in Number"
          required
        />
      </div>

      <div class=" mt-10">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="john.doe@company.com"
          required
        />
      </div>
      <button class="inline-flex text-white mt-10  bg-[#f178b6] border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        Fund Now
      </button>
    </div>
  );
}

export default Fund_wallet;
