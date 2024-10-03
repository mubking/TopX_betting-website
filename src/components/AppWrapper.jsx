"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import DashboardNavbar from "./dashboard/DashboardNavbar";
import { Html, Head, Main, NextScript } from "next/document";


export const AppWrapper = ({ children }) => {
  const pathName = usePathname();
  const authRoute = ["login", "signup"];
  

  return (
    <div className="">
      {pathName === "/login" || pathName === "/signup" || pathName === "/" ? (
        <Navbar />
      ) : (
        <DashboardNavbar />
      )}
      {children}
    </div>
  );
};
