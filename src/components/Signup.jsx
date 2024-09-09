"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function Signup({ session }) {
  const router = useRouter();
  if (session) {
    router.push("/dashboard");
  }
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "username") {
      if (value.trim() !== "") {
        setErrors({ ...errors, username: "" });
      } else {
        setErrors({ ...errors, username: "This field is required" });
      }
    } else if (name === "email") {
      if (value.trim() !== "") {
        setErrors({ ...errors, email: "" });
      } else {
        setErrors({ ...errors, email: "This field is required" });
      }
    } else if (name === "password") {
      if (value.trim() !== "") {
        setErrors({ ...errors, password: "" });
      } else {
        setErrors({ ...errors, password: "This field is required" });
      }
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword();
    if (value.trim() !== "") {
      setErrors({ ...errors, confirmPassword: "" });
    } else {
      setErrors({ ...errors, confirmPassword: "This field is required" });
    }

    if (value.trim() !== userDetails.password.trim()) {
      setErrors({ ...errors, confirmPassword: "Password do not match" });
    }
  };

  const handleJoinClick = async (e) => {
    e.preventDefault();
    if (!userDetails.username) {
      setErrors({ ...errors, username: "This field is required" });
    } else if (!userDetails.email) {
      setErrors({ ...errors, email: "This field is required" });
    } else if (!userDetails.password) {
      setErrors({ ...errors, password: "This field is required" });
    } else {
      setLoading(true);

      try {
        const response = await fetch("/api/signup/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        });

        const data = await response.json();
        const { message } = data;

        if (response.ok) {
          toast.success(message, {
            position: "top-right",
            autoClose: 3000,
          });
          // Clear the form fields after successful registration
          setUserDetails({
            email: "",
            password: "",
            username: "",
          });
          setLoading(false);
          router.push("/login");
        } else {
          toast.error(message, {
            position: "top-right",
            autoClose: 3000,
          });
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred during registration", {
          position: "top-right",
          autoClose: 3000,
        });
        setLoading(false);
      }
    }
  };
  const AlreadyHaveanAccount = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // const handleJoinClick = (e) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     toast.error("Passwords do not match!");
  //   } else {
  //     router.push("/login")
  //     toast.success("Successfully signed up!");
  //     // Add your form submission logic here
  //   }
  // };

  return (
    <>
      <div className="relative min-h-screen w-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/Signup.png')`,
            zIndex: -2,
          }}
        />
        <div
          className="absolute inset-0 bg-blue-700 opacity-50"
          style={{ backgroundColor: "#4c5aa6", zIndex: -1 }}
        />
        <div className="relative text-white flex flex-col md:flex-row justify-center gap-10 items-center min-h-screen md:h-full w-full capitalize">
          <div className=" h-[80vh] w-[100%] md:w-[30%] mt-5 text-center">
            <h1 className="text-3xl ">Are You A Gamer?</h1>
            <p>
              {" "}
              <span className="text-3xl">Top X</span>
              <span className="text-xl">
                {" "}
                is the best platform to earn reward for your passion!{" "}
              </span>
            </p>

            <div className=" mt-20 text-center text-2xl">
              <h1>Get Started in 3 Steps </h1>
            </div>
            <div className=" flex flex-row mt-10 gap-5">
              <div className="w-full">
                <div
                  className="bg-[#5d5fef] w h-[20vh] flex flex-col justify-center items-center "
                  style={{ borderRadius: "50%" }}
                >
                  <div>
                    <img
                      src="/Group_20249.png"
                      alt=""
                      style={{ height: "8vh" }}
                    />
                  </div>
                  <div className="mt-2">
                    <h2>Sign up</h2>
                  </div>
                </div>
                <h2 className="text-sm mt-5">
                  Sign Up In less than 15 seconds
                </h2>
              </div>

              <div className="w-full ">
                <div
                  className="bg-[#7879f1]  h-[20vh] flex flex-col mt-7 justify-center items-center "
                  style={{ borderRadius: "50%" }}
                >
                  <div>
                    <img
                      src="/Group_26945.png"
                      alt=""
                      style={{ height: "8vh" }}
                    />
                  </div>
                  <div className="mt-2">
                    <h2>Deposit</h2>
                  </div>
                </div>
                <h2 className="text-sm mt-5">
                  Deposit & challenge another gamer
                </h2>
              </div>

              <div className="w-full">
                <div
                  className="bg-[#a5a6f6] w-[100%] h-[20vh] flex mt-14 flex-col justify-center items-center "
                  style={{ borderRadius: "50%" }}
                >
                  <div>
                    <img
                      src="/Path_529.png"
                      alt=""
                      style={{ height: "10vh" }}
                    />
                  </div>
                  <div>
                    <h2>play</h2>
                  </div>
                </div>
                <h2 className="text-sm mt-5">
                  play and claim rewards every day
                </h2>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col h-fit w-[100%] md:w-[30%]  p-4 rounded-2xl">
            <div
              className="absolute inset-0 bg-[#8f98db] rounded-2xl opacity-50"
              style={{ zIndex: -1 }}
            ></div>
            <h1 className="relative text-white text-2xl">
              Sign Up. <span className="text-xl">It's Fast!</span>
            </h1>
            <form className="flex flex-col gap-4 mt-6" action="">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="username"
                  id="username"
                  name="username"
                  value={userDetails.username}
                  onChange={handleChangeInput}
                  className="w-full bg-[#b0b0d6] placeholder:text-white rounded-xl border border-[#D9D9D9] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.username && (
                  <div className="p-1 bg-red-200 text-red-600 border-l-2 text-sm mt-2 border-l-red-600">
                    {errors.username}
                  </div>
                )}
              </div>
              <div className="relative mb-4">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={userDetails.email}
                  onChange={handleChangeInput}
                  placeholder="email"
                  className="w-full bg-[#b0b0d6] placeholder:text-white rounded-xl border border-[#D9D9D9] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.email && (
                  <div className="p-1 bg-red-200 text-red-600 border-l-2 text-sm mt-2 border-l-red-600">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  value={userDetails.password}
                  onChange={handleChangeInput}
                  id="password"
                  name="password"
                  placeholder="Password"
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
              <div className="relative mb-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full bg-[#b0b0d6] placeholder:text-white rounded-xl border border-[#D9D9D9] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <div
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
                {errors.confirmPassword && (
                  <div className="p-1 bg-red-200 text-red-600 border-l-2 text-sm mt-2 border-l-red-600">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <div className="mb-4 flex items-center gap-2 relative">
                <input type="checkbox" name="terms" id="terms" />
                <span className="text-sm">
                  I’m over 18 years old and I agree to the Legal terms and
                  Privacy Policy.
                </span>
              </div>
              <div className="w-full text-left cursor-pointer">
                <p>
                  already have an existing account?{" "}
                  <span className="text-[blue]" onClick={AlreadyHaveanAccount}>
                    Click here...
                  </span>
                </p>
              </div>
              <div className="mb-4 relative">
                <button
                  onClick={handleJoinClick}
                  disabled={loading}
                  className="w-full bg-[#7879f1] px-5 py-3 text-white rounded-full"
                >
                  {loading ? "Signing Up" : "Sign Up"}
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

export default Signup;
