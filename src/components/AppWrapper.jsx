"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import DashboardNavbar from "./dashboard/DashboardNavbar";
import { Html, Head, Main, NextScript } from "next/document";
import { deleteExpiredChallenges } from "../cron-job";
// import {deleteExpiredChallenges} from "../cron"

export const AppWrapper = ({ children }) => {
  const pathName = usePathname();
  const authRoute = ["login", "signup"];
  useEffect(() => {
    deleteExpiredChallenges();
  }, []);

  return (
    <div className="">
      {pathName === "/login" || pathName === "/signupss" || pathName === "/" ? (
        <Navbar />
      ) : (
        <DashboardNavbar />
      )}
      {children}
    </div>
  );
};
