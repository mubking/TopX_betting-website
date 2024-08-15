"use client"
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleJoinClick = (e) => {
    e.preventDefault();
    router.push("/dashboard")
    // Add your form submission logic here
  };

  return (
    <>
      <div className="relative h-screen w-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/IMG-20240111-WA0016.jpg')`,
            zIndex: -2,
          }}
        />
        {/* Semi-transparent Overlay */}
        <div
          className="absolute inset-0 bg-[#a2a1e3] opacity-50"
          style={{ backgroundColor: "#4c5aa6", zIndex: -1 }}
        />
        {/* Content Over the Image */}
        <div className="relative flex justify-center text-white gap-10 items-center h-full w-full capitalize">
          <div className="flex flex-col justify-center h-[80vh] w-[30%] text-center">
            <h1 className="text-3xl">Welcome Back!</h1>
            <p className="text-lg"> 
              Log into your <span className="text-3xl">Top X</span> account to
              continue enjoying rewards for what you love doing the most!
            </p>
          </div>
          <div className="relative flex flex-col w-[30%] p-4 rounded-2xl">
            <div
              className="absolute inset-0 bg-[#8f98db] rounded-2xl opacity-50"
              style={{ zIndex: -1 }}
            ></div>
            <h1 className="relative text-white text-2xl">
              It’s good to see you again!
            </h1>
            <form className="flex flex-col gap-4 mt-6" action="">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="username"
                  id="username"
                  name="username"
                  className="w-full bg-[#b0b0d6] placeholder:text-white rounded-xl border border-[#D9D9D9] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#b0b0d6] placeholder:text-white rounded-xl border border-[#D9D9D9] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="w-full text-right cursor-pointer">
                <p>Forgot Password?</p>
              </div>

              <div className="mb-4 relative">
                <button
                  onClick={handleJoinClick}
                  className="w-full bg-[#7879f1] px-5 py-3 text-white rounded-full"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
