"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

function New_Challenges() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    level: "beginners",
    streamLink: "",
    amount: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log(formData);
    const currentDateTime = new Date();
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (start <= currentDateTime) {
      toast.error("Start date must be in the future.");
      return;
    }

    // Validation: Check if end date is after the start date
    if (end <= start) {
      toast.error("End date must be after the start date.");
      return;
    }

    const res = await fetch("/api/challenge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    const { message } = data;
    if (res.ok) {
      toast.success(message);
      setLoading(false);
      router.push("/dashboard");
    } else {
      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full p-5">
      <div className=" w-full md:w-[30%]">
        <h1 className="text-2xl font-bold">
          Are you a pro gamer? Challenge someone today and stand a chance to win
          big bag!
        </h1>
        <p className="mt-3 text-gray-600">
          There are many possibilities you can achieve with us. Let’s help you
          gain reward for what you like doing the most!
        </p>
      </div>
      <h1 className="text-center text-2xl font-extrabold mt-5">
        Post New Challenge
      </h1>

      {/* Challenge Title */}
      <div>
        <label
          htmlFor="title"
          className="block mb-2 font-extrabold text-xl text-gray-900"
        >
          Challenge title
        </label>
        <div className="flex flex-col">
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 font-extrabold text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="No One can win me on call of duty!"
          />
        </div>
      </div>

      <div className="mt-10">
        <label
          htmlFor="amount"
          className="block mb-2 font-extrabold text-xl text-gray-900"
        >
          Amount to stake (NGN)
        </label>
        <div className="flex flex-col">
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 font-extrabold text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="2000"
          />
        </div>
      </div>

      <div className="mt-10">
        <label
          htmlFor="time"
          className="block mb-2 font-extrabold text-xl text-gray-900"
        >
          Expected Challenge Time
        </label>

        <form className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="start-time"
              className="block mb-2 text-lg font-semibold text-gray-900"
            >
              Start time:
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="end-time"
              className="block font-extrabold mb-2 text-lg  text-gray-900"
            >
              End time:
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
        </form>
        <div className="w-[100%] max-w-xs ">
          <label
            className="block text-gray-700 font-extrabold text-xl mb-2"
            htmlFor="skill-level"
          >
            Select Skill Level
          </label>
        </div>
        <div className="flex gap-10 mt-10">
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleInputChange}
            className="block appearance-none text-lg text-semibold w-[100%] bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
          <input
            type="url"
            id="streamLink"
            name="streamLink"
            value={formData.streamLink}
            onChange={handleInputChange}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-lg text-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Streaming link"
          />
        </div>
        <div className="mt-10 ">
          <label htmlFor="More Description for opponent">
            <h1 className="text-xl font-extrabold">
              More Description for opponent
            </h1>
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
            class="block  mt-3 p-2.5 w-full text-lg font-semibold text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="You must be an intermediate level on call of duty and ready to take defeat becase i am going to unleash you!"
          ></textarea>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={handleSubmit}
            className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            {loading ? "Posting Challenge" : "Post Challenge"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default New_Challenges;
