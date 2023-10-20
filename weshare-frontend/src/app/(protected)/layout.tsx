"use client";
import { Navbar } from "@/components/Navbar/Navbar";
import { ProtectedRoutes } from "@/redux/store/ProtectedRoutes";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      <ProtectedRoutes>
        <Navbar />
        {children}
      </ProtectedRoutes>
    </NextUIProvider>
  );
};

export default Layout;
