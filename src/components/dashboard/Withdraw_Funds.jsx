"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const WithdrawFunds = () => {
  const [banks, setBanks] = useState([]);
  const [recipientName, setRecipientName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [currency] = useState("NGN");
  const [amount, setAmount] = useState("");
  const [accountVerified, setAccountVerified] = useState(false);
  const [showRecipientName, setShowRecipientName] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBankName, setSelectedBankName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("https://api.paystack.co/bank?currency=NGN", {
          headers: {
            Authorization: `Bearer sk_live_afa2869de32adb4bb1d34e2fe50f7185dc1e3814`,
          },
        });
        setBanks(response.data.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
        toast.error("Failed to fetch banks. Please try again later.");
      }
    };
    fetchBanks();
  }, []);

  const verifyAccountNumber = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
        {
          headers: {
            Authorization: `Bearer sk_live_afa2869de32adb4bb1d34e2fe50f7185dc1e3814`,
          },
        }
      );
      setRecipientName(response.data.data.account_name);
      setAccountVerified(true);
      setShowRecipientName(true);
      toast.success("Account verified successfully!");
    } catch (error) {
      setAccountVerified(false);
      setShowRecipientName(false);
      toast.error(error.response ? "Invalid account number or bank code." : "Network error: Please check your internet connection.");
      console.error("Error verifying account number:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (value) => {
    const cleanedValue = value.replace(/[^0-9.]/g, "");
    const [whole, decimal] = cleanedValue.split(".");
    const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimal !== undefined
      ? `${formattedWhole}.${decimal.slice(0, 2)}`
      : formattedWhole;
  };

  const handleAmountChange = (e) => {
    const formattedAmount = formatAmount(e.target.value);
    setAmount(formattedAmount);
  };

  const initiateTransfer = () => {
    const selectedBank = banks.find((bank) => bank.code === bankCode);
    setSelectedBankName(selectedBank ? selectedBank.name : "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const generateReceipt = () => {
    const input = document.getElementById("receipt-content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 10, 10);
      pdf.save("receipt.pdf");
    });
  };

  return (
    <div className="flex flex-col justify-center items-center p-5 mt-5">
      <ToastContainer />
      <h1 className="text-2xl">Withdraw Funds</h1>

      <div className="w-full max-w-md">
        <h2 className="text-xl">Bank</h2>
        <select
          value={bankCode}
          onChange={(e) => setBankCode(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg bg-blue-600 text-white"
        >
          <option value="">Select Bank</option>
          {banks.map((bank) => (
            <option key={bank.id} value={bank.code}>
              {bank.name}
            </option>
          ))}
        </select>

        <div className="mt-5">
          <h1 className="text-lg">Account number</h1>
          <input
            className="w-full p-2 border border-gray-300 rounded-lg"
            type="text"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>

        <div className="mt-5">
          {showRecipientName && (
            <div className="mt-5">
              <h5>
                You’re about to withdraw to:{" "}
                <span className="bg-red-500 text-white p-3 text-lg">
                  {recipientName}
                </span>
              </h5>
            </div>
          )}
          <button
            onClick={verifyAccountNumber}
            className={`inline-flex mt-5 text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Confirm Receiver"}
          </button>
        </div>

        {accountVerified && (
          <div className="mt-5">
            <input
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={handleAmountChange}
              className="mt-2 w-full p-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={initiateTransfer}
              className="inline-flex mt-5 text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full"
            >
              Withdraw
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className="bg-blue-600 text-white p-10 rounded-lg flex flex-col justify-center items-center text-center"
            id="receipt-content"
          >
            <h1 className="w-full text-xl">
              Hey Tosh, You have successfully withdrawn NGN {amount} into{" "}
              {recipientName} {selectedBankName} Account
            </h1>

            <button
              onClick={generateReceipt}
              className="inline-flex mt-5 text-black bg-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Download Receipt
            </button>
            <button
              onClick={closeModal}
              className="inline-flex mt-5 text-black bg-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg ml-4"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawFunds;
