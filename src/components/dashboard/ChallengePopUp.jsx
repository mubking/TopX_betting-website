import React from "react";
import { TbX } from "react-icons/tb";

const ChallengePopUp = ({ data, setSelectedChallenge }) => {
  return (
    <div className="fixed bg-[rgba(0,0,0,.1)] z-[1000] top-0 bottom-0 right-0 left-0 h-screen w-full flex items-center justify-center">
      <div className="w-full bg-white rounded-xl p-5 max-w-[450px]">
        <div className="flex items-center justify-between">
          <span></span>
          <button onClick={()=> setSelectedChallenge("")}>
            <TbX />
          </button>
        </div>
        <div className="">
          <h1 className="text-center text-xl">{data.title}</h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-[200px] flex items-center justify-center flex-col border border-dashed rounded w-[200px]">
              <div className="w-[50px] h-[50px] bg-[#fafafa] rounded-full"></div>
              <span className="capitalize font-bold opacity-70">{data.user.username}</span>
              <button className="bg-[#fafafa] p-2 rounded text-sm">N{data.amount}.00</button>
            </div>
            <div className="">
                <h2>VS</h2>
            </div>
            <div className="h-[200px] flex items-center justify-center flex-col border border-dashed rounded w-[200px]">
              <div className="w-[50px] h-[50px] bg-[#fafafa] rounded-full"></div>
              <span className="capitalize font-bold opacity-70">Opponent</span>
              <button className="bg-[#fafafa] p-2 rounded text-sm">pending...</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengePopUp;
