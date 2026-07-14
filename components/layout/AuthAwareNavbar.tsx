"use client";

import React from "react";
import { Navbar } from "../navigation/Navbar";
import { usePathname } from "next/navigation";

// List of auth route prefixes (must match the routes that should hide the navbar)
const authRoutes = [
  "/register",
  "/login",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/otp-verification",
];

export function AuthAwareNavbar() {
  const pathname = usePathname();
  // If the current path is an auth route, render nothing
  if (authRoutes.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }
  // Otherwise render the regular Navbar
  return <Navbar />;
}
