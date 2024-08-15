"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";
import DashboardNavbar from "./dashboard/DashboardNavbar";
import { Html, Head, Main, NextScript } from 'next/document';


export const AppWrapper = ({ children }) => {
  const pathName = usePathname();
  const authRoute = ["login", "signup"];

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
