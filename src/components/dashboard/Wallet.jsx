"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { _yY } from "../../lib/_hjs";

function Wallet() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const getAllTransactions = async () => {
      const response = await axios.get("/api/transactions");
      console.log(response);
      const { data, status } = response;
      console.log(data);
      if (status === 200) {
        setTransactions(data.transaction.transactions);
      } else {
      }
    };
    getAllTransactions();
  }, []);
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getEncrytedReference = localStorage.getItem("_tyu");
    if (getEncrytedReference) {
      const decrytedReference = _yY(getEncrytedReference);
      setReference(decrytedReference);
    }
  }, []);

  const fetchBalance = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/getUserBalance");
      if (response.data.balance) {
        setBalance(response.data.balance);
        setLoading(false);
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(
        "Error fetching balance:",
        error.response?.data || error.message
      );
    }
  };

  const verifyBalance = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/verifyTransaction",
        {
          reference,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        localStorage.removeItem("_tyu");
        setLoading(false);
        setBalance(response.data.balance);
      }
      if (response.data.error) {
        toast.error(response.data.error);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(
        "Error fetching balance:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    reference && verifyBalance();
  }, [reference]);
  useEffect(() => {
    !reference && fetchBalance();
  }, [reference]);

  const handleWalletClick = (e) => {
    e.preventDefault();
    router.push("/fund_wallet");
  };

  const handleWalletWithdraw = (e) => {
    e.preventDefault();
    router.push("/withdraw_funds");
  };
  return (
    <div className="p-10">
      <h1 className="text-2xl font-extrabold "> Wallet</h1>
      <p>Manage your wallet and all other transactions</p>
      <div
        className="bg-[#7879f1] h-[50vh] w-full rounded p-5 mt-7"
        style={{ borderRadius: "30px" }}
      >
        <div className=" flex flex-row items-center gap-5">
          <div>
            <h2 className="text-white text-lg mt-">Available Balance</h2>
          </div>
          <div className="mt-2">
            <FaEye />
          </div>
        </div>

        <div className="text-2xl mt-5">
          <h1>
            NGN{" "}
            {loading ? (
              <span>loading ....</span>
            ) : (
              balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })
            )}
          </h1>
          <h1 className="text-white mt-2">Estimated Total Balance</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-2 justify-between mt-10">
          <button
            className="inline-flex text-white bg-[#373742] border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={handleWalletClick}
          >
            Fund Wallet
          </button>

          <button
            className="inline-flex bg-[white] text-[#373742] border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={handleWalletWithdraw}
          >
            Withdraw Funds
          </button>
        </div>
      </div>
      <h1 className="mt-5 text-2xl font-semibold">Transaction History</h1>

      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-lg text-white uppercase bg-[#7879F1] dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Username{" "}
              </th>
              <th scope="col" class="px-6 py-3">
                Amount
              </th>
              <th scope="col" class="px-6 py-3">
                Transaction Status
              </th>
              <th scope="col" class="px-6 py-3">
                Transaction Reference
              </th>
              <th scope="col" class="px-6 py-3">
                Transaction Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction, i) => (
              <tr
                key={i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {session?.user?.username}
                </th>
                <td className="px-6 py-4">{transaction.amount}</td>
                <td className="px-6 py-4">{transaction.status}</td>
                <td className="px-6 py-4">{transaction.reference}</td>
                <td className="px-6 py-4">
                  {new Date(transaction.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true, // This ensures AM/PM is shown
                  })}
                </td>{" "}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Wallet;
