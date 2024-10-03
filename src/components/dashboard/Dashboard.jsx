"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { _yY } from "../../lib/_hjs";
import { formatLargestTimeUnit } from "../../lib/date.js";
import ChallengePopUp from "./ChallengePopUp";

function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  const [balance, setBalance] = useState(0);
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    loading: false,
    data: [],
    error: "",
  });
  const [selectedChallenge, setSelectedChallenge] = useState("");

  useEffect(() => {
    const getEncrytedReference = localStorage.getItem("_tyu");
    if (getEncrytedReference) {
      const decrytedReference = _yY(getEncrytedReference);
      setReference(decrytedReference);
    }
  }, []);

  const fetchBalance = async () => {
    console.log("yeah it is fetchBalance")
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
    console.log("yeah it is verifyBalance")
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

  useEffect(() => {
    const getChallenges = async () => {
      setInfo({
        ...info,
        loading: true,
      });
      const response = await fetch("/api/challenge");
      const result = await response.json();
      const { data, message } = result;

      if (response.ok) {
        setInfo({
          ...info,
          data,
          loading: false,
          error: "",
        });
      } else {
        setInfo({
          ...info,
          data: [""],
          loading: false,
          error: message,
        });
      }
    };
    getChallenges();
  }, []);

  const handleWalletClick = (e) => {
    e.preventDefault();
    router.push("/fund_wallet");
  };

  const handleWalletWithdraw = (e) => {
    e.preventDefault();
    router.push("/withdraw_funds");
  };

  return (
    <div className="p-5 w-full md:container min-h-screen">
      {/* <div className="flex flex-col md:flex-row justify-between items-center"> */}

      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="w-full">
          <h1 className="text-2xl">Hey {session?.user?.username},</h1>
          <h1 className="text-2xl mt-2"> Welcome to Top X</h1>
          <p className="text-[#acacac] mt-3 text-lg">
            There are many possibilities you can achieve with us. Let’s help you
            gain rewards for what you love doing the most!
          </p>
        </div>
        <div className="w-full one">
          <img
            src="/Topxtransparent black 1.png"
            alt=""
            style={{ height: "40vh" }}
          />
        </div>
      </div>

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

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mt-5 text-center text-gray-800">
          Latest Challenges
        </h1>

        {info.loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="text-lg font-semibold text-blue-600">
              Loading...
            </div>
          </div>
        ) : info.error ? (
          <div className="flex justify-center items-center h-32">
            <div className="text-lg font-semibold text-red-600">
              {info.error}
            </div>
          </div>
        ) : (
          info.data &&
          info?.data?.map((d, i) => (
            <>
              <div
                key={i}
                className="bg-white shadow-lg rounded-lg overflow-hidden mb-5 transform transition hover:scale-105 hover:shadow-xl"
              >
                <div className=" w-full p-5 border-t-4 border-blue-500 mt-5">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex flex-row gap-2">
                      <div className="">
                        <div className="h-[50px] w-[50px] rounded-full bg-[#fafafa]"></div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex gap-2 items-center">
                          <h2 className="text-blue-500 capitalize">
                            {d.user.username}
                          </h2>
                          {d.createdAt && (
                            <span className=" opacity-70">
                              {formatLargestTimeUnit(
                                d.createdAt && d.createdAt
                              )}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {d.title}
                        </h3>
                        <div className="flex  flex-col gap-3  md:flex-row items-center">
                          <button className="text-gray-500 bg-[#fafafa] p-2 rounded border-none">
                            Amount:
                            <span>N{d.amount}.00</span>
                          </button>
                          <button className="text-gray-500 bg-[#fafafa] p-2 rounded border-none">
                            Start:{" "}
                            <span className="font-medium">
                              {new Date(d.startDate).toLocaleString()}
                            </span>
                          </button>
                          <button className="text-gray-500 bg-[#fafafa] p-2 rounded border-none">
                            End:{" "}
                            <span className="font-medium">
                              {new Date(d.endDate).toLocaleString()}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <button
                        onClick={() => setSelectedChallenge(d.id)}
                        className="bg-blue-500 border-none rounded text-sm text-white p-2"
                      >
                        Accept challenge
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {selectedChallenge === d.id && (
                <ChallengePopUp
                  setSelectedChallenge={setSelectedChallenge}
                  data={d}
                />
              )}
            </>
          ))
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Dashboard;
