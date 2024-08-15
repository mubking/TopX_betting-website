"use client";
import { useState } from "react";

function New_Challenges() {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("09:30");

  // Handle Start Time Change
  const handleStartTimeChange = (event) => {
    const newStartTime = event.target.value;
    setStartTime(newStartTime);

    // Ensure the end time is not earlier than the start time
    if (newStartTime >= endTime) {
      setEndTime(newStartTime);
    }
  };
  const [selectedLevel, setSelectedLevel] = useState("Intermediate");

  const handleSelectChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  // Handle End Time Change
  const handleEndTimeChange = (event) => {
    const newEndTime = event.target.value;
    setEndTime(newEndTime);

    // Ensure the start time is not later than the end time
    if (newEndTime <= startTime) {
      setStartTime(newEndTime);
    }
  };

  return (
    <div className="min-h-screen w-full p-5">
      <div className="w-[30%]">
        <h1 className="text-2xl font-bold">
          Are you a pro gamer? Challenge someone today and stand a chance to win
          big bag!
        </h1>
        <p className="mt-3 text-gray-600">
          There are many possibilities you can achieve with us. Let’s help you
          gain reward for what you like doing the most!
        </p>
      </div>
      <h1 className="text-center text-2xl font-extrabold">
        Post New Challenge
      </h1>

      {/* Challenge Title */}
      <div>
        <label
          htmlFor="challenge-title"
          className="block mb-2 font-extrabold text-xl text-gray-900"
        >
          Challenge title
        </label>
        <div className="flex flex-col">
          <input
            type="text"
            id="challenge-title"
            className="bg-gray-50 border border-gray-300 text-gray-900 font-extrabold text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="No One can win me on call of duty!"
            required
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
            className="bg-gray-50 border border-gray-300 text-gray-900 font-extrabold text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="2000"
            required
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
                type="time"
                id="start-time"
                value={startTime}
                onChange={handleStartTimeChange}
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                min="09:00"
                max="18:00"
                required
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
                type="time"
                id="end-time"
                value={endTime}
                onChange={handleEndTimeChange}
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                min={startTime}
                max="18:00"
                required
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
            id="skill-level"
            value={selectedLevel}
            onChange={handleSelectChange}
            className="block appearance-none text-lg text-semibold w-[100%] bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
          <input
            type="url"
            id="website"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-lg text-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Streaming link"
            required
          />
        </div>
        <div className="mt-10 ">
          <label htmlFor="More Description for opponent">
            <h1 className="text-xl font-extrabold">
              More Description for opponent
            </h1>
          </label>
          <textarea
            id="message"
            rows="4"
            class="block  mt-3 p-2.5 w-full text-lg font-semibold text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="You must be an intermediate level on call of duty and ready to take defeat becase i am going to unleash you!"
          ></textarea>
        </div>

        <div className="mt-5 flex justify-end">
          <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Post Challenge
          </button>
        </div>
      </div>
    </div>
  );
}

export default New_Challenges;
