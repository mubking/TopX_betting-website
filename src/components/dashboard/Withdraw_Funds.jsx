"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

const WithdrawFunds = () => {
  const [banks, setBanks] = useState([]);
  const [recipientName, setRecipientName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [currency] = useState("NGN");
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [accountVerified, setAccountVerified] = useState(false);
  const [showRecipientName, setShowRecipientName] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [recipientCode, setRecipientCode] = useState("");
  const [showTransferSection, setShowTransferSection] = useState(false);
  const [transferReason, setTransferReason] = useState("");
  const [transferCode, setTransferCode] = useState(""); // Added state for transferCode
  const { data: session } = useSession();

  useEffect(() => {
    const fetchBanks = async () => {
      const response = await fetch("/api/getbanks");
      const result = await response.json();

      if (response.ok) {
        setBanks(result.data.data);
      } else {
        toast.error("Failed to fetch banks. Please try again later.");
      }
    };
    fetchBanks();
  }, []);

  const verifyAccountNumber = async () => {
    try {
      const response = await axios.get(
        `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
        {
          headers: {
            Authorization: `Bearer sk_live_afa2869de32adb4bb1d34e2fe50f7185dc1e3814`,
          },
        }
      );
      console.log("Account Verification Response:", response.data); // Debugging line
      setRecipientName(response.data.data.account_name);
      setAccountVerified(true);
      setShowRecipientName(true);
      setShowContinueButton(true);
      toast.success("Account verified successfully!");
    } catch (error) {
      console.error("Failed to verify account number:", error); // Debugging line
      setAccountVerified(false);
      setShowRecipientName(false);
      toast.error("Invalid account number or bank code.");
    }
  };

  const createRecipient = async () => {
    try {
      const response = await axios.post(
        "https://api.paystack.co/transferrecipient",
        {
          type: "nuban",
          name: recipientName,
          account_number: accountNumber,
          bank_code: bankCode,
          currency,
        },
        {
          headers: {
            Authorization: `Bearer sk_live_afa2869de32adb4bb1d34e2fe50f7185dc1e3814`,
          },
        }
      );
      console.log("Create Recipient Response:", response.data); // Debugging line
      setRecipientCode(response.data.data.recipient_code);
      setShowTransferSection(true);
      toast.success("Recipient created successfully!");
    } catch (error) {
      console.error("Failed to create recipient:", error); // Debugging line
      toast.error("Failed to create recipient.");
    }
  };

  const initiateTransfer = async () => {
    try {
      const response = await axios.post(
        "https://api.paystack.co/transfer",
        {
          source: "balance",
          amount: parseFloat(amount.replace(/,/g, "")) * 100, // Convert to kobo
          recipient: recipientCode,
          reason: transferReason,
        },
        {
          headers: {
            Authorization: `Bearer sk_live_afa2869de32adb4bb1d34e2fe50f7185dc1e3814`,
          },
        }
      );
      console.log("Initiate Transfer Response:", response.data); // Debugging line
      setTransferCode(response.data.data.transfer_code); // Store transfer_code
      toast.success(
        "Transfer initiated. Please enter the OTP sent to your email."
      );
    } catch (error) {
      console.error(
        "Error initiating transfer:",
        error.response?.data || error.message
      ); // More detailed error logging
      if (
        error.response &&
        error.response.data.code === "insufficient_balance"
      ) {
        toast.error(
          "Your balance is not enough to fulfil this request. Please top up your Paystack balance."
        );
      } else {
        toast.error("Error initiating transfer. Check console for details.");
      }
    }
  };

  const finalizeTransfer = async () => {
    try {
      const response = await axios.post("/api/finalizeTransfer", {
        transferCode, // Ensure this is correctly passed
        otp,
      });
      toast.success("Transfer completed successfully!");
    } catch (error) {
      console.error("Failed to complete transfer:", error); // Debugging line
      toast.error("Failed to complete transfer.");
    }
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

        <button
          onClick={verifyAccountNumber}
          className="mt-5 p-2 bg-blue-500 text-white rounded-lg"
        >
          Verify Account
        </button>

        {showRecipientName && (
          <div className="mt-5">
            <h1 className="text-lg">Recipient Name: {recipientName}</h1>
          </div>
        )}

        {showContinueButton && (
          <button
            onClick={createRecipient}
            className="mt-5 p-2 bg-green-500 text-white rounded-lg"
          >
            Continue
          </button>
        )}

        {showTransferSection && (
          <div className="mt-5">
            <h1 className="text-lg">Amount</h1>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg"
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <h1 className="text-lg mt-3">Transfer Reason</h1>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg"
              type="text"
              placeholder="Transfer Reason"
              value={transferReason}
              onChange={(e) => setTransferReason(e.target.value)}
            />

            <button
              onClick={initiateTransfer}
              className="mt-5 p-2 bg-green-500 text-white rounded-lg"
            >
              Transfer
            </button>

            {/* Display Recipient Code */}
            {recipientCode && (
              <div className="mt-5">
                <h1 className="text-lg">Recipient Code: {recipientCode}</h1>
              </div>
            )}
          </div>
        )}
        {/* 
        {showTransferSection && (
          <div className="mt-5">
            <h1 className="text-lg">OTP</h1>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={finalizeTransfer}
              className="mt-5 p-2 bg-blue-500 text-white rounded-lg"
            >
              Confirm Transfer
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default WithdrawFunds;
