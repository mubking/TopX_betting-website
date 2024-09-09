"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showCaseSensitivityMessage, setShowCaseSensitivityMessage] =
    useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleJoinClick = async (e) => {
    e.preventDefault();
    if (!username) {
      setErrors((prev) => ({ ...prev, username: "This Field is Required" }));
    } else if (!password) {
      setErrors((prev) => ({ ...prev, password: "This Field is Required" }));
    } else {
      setLoading(true);
      setErrors({ ...errors, username: "", password: "" });
      try {
        const signInData = await signIn("credentials", {
          username: username,
          password: password,
          redirect: false,
        });

        if (signInData.error) {
          setLoading(false);
          toast.error(
            "Invalid Credentials, Please check your username and password",
            {
              position: "top-right",
              autoClose: 3000,
            }
          );

          console.error(signInData.error);
        } else {
          setLoading(false);
          toast.success("Login Successfull", {
            position: "top-right",
            autoClose: 1000,
          });
          toast.success("Redirecting to Profile page", {
            position: "top-right",
            autoClose: 2000,
          });
          router.refresh();
          router.push("/dashboard");
        }
      } catch (error) {
        setLoading(false);
        console.error("Network error:", error);
      }
    }
  };
  const AlreadyHaveanAccount = (e) => {
    e.preventDefault();
    router.push("/signup");
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
        <div
          className="absolute inset-0 bg-[#a2a1e3] opacity-50"
          style={{ backgroundColor: "#4c5aa6", zIndex: -1 }}
        />
        <div className="relative flex flex-col md:flex-row justify-center text-white gap-10 items-center h-full w-full capitalize">
          <div className="flex flex-col justify-center h-[80vh] w-[100%] md:w-[30%] text-center">
            <h1 className="text-3xl">Welcome Back!</h1>
            <p className="text-lg">
              Log into your <span className="text-3xl">Top X</span> account to
              continue enjoying rewards for what you love doing the most!
            </p>
          </div>
          <div className="relative flex flex-col w-[100%] md:w-[30%]  p-4 rounded-2xl">
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
                  value={username}
                  onFocus={() => setShowCaseSensitivityMessage(true)}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (e.target.value) {
                      setShowCaseSensitivityMessage(false);
                    }
                  }}
                  className="w-full bg-[#b0b0d6] placeholder:text-white rounded-xl border border-[#D9D9D9] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {showCaseSensitivityMessage && (
                  <div className="text-sm text-[red]  font-semibold  mt-2">
                    Our database is case-sensitive. Please enter your username
                    exactly as you registered it.
                  </div>
                )}
                {errors.username && (
                  <div className="p-1 bg-red-200 text-red-600 border-l-2 text-sm mt-2 border-l-red-600">
                    {errors.username}
                  </div>
                )}
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
                {errors.password && (
                  <div className="p-1 bg-red-200 text-red-600 border-l-2 text-sm mt-2 border-l-red-600">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="w-full text-left cursor-pointer">
                <p>
                  don’t have an account?{" "}
                  <span className="text-[blue]" onClick={AlreadyHaveanAccount}>
                    Click here...
                  </span>
                </p>
              </div>
              <div className="w-full text-right cursor-pointer">
                <p>Forgot Password?</p>
              </div>

              <div className="mb-4 relative">
                <button
                  onClick={handleJoinClick}
                  disabled={loading}
                  className="w-full bg-[#7879f1] px-5 py-3 text-white rounded-full"
                >
                  {loading ? "Login In..." : "Login"}
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
